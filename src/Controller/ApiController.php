<?php

namespace App\Controller;

use App\Entity\Attribution;
use App\Form\AttributionType;
use App\Repository\AttributionRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/attribution", name="api_attribution_home", methods={"POST"})
     */
    public function index(AttributionRepository $attributionRepository, NormalizerInterface $normalizer, Request $request = null) 
    {
        /* récupération des données */
        $json = $request->getContent();
        $data = json_decode($json, true);
        $form = $this->createFormBuilder(null, ['csrf_protection' => false])

            ->add('dateDebut', DateTimeType::class, [
                'date_widget' => 'single_text',
                'constraints' => [
                    new NotBlank(),
                    new NotNull()
                ]
            ])
            ->add('dateFin', DateTimeType::class, [
                'date_widget' => 'single_text',
                'constraints' => [
                    new NotBlank(),
                    new NotNull(),
                    new GreaterThanOrEqual([
                        'propertyPath' => 'parent.all[dateDebut].data'
                    ])
                ]
            ])
            ->getForm();
        $form->submit($data);

        if ($form->isValid()) {

            $donnees = $form->getData();
            
            $attributions = $attributionRepository->getAttribution($donnees["dateDebut"], $donnees["dateFin"]);
            $attributionsNormalise = $normalizer->normalize($attributions, null, ['groups' => 'attribution:read']);
            $data = [];
            foreach ($attributionsNormalise as $attribution) {
                $data[] = [
                    'id' => $attribution['id'],
                    'title' => 'Réservation de '. $attribution['ordinateur']['modele'] ." par ". $attribution['user']['email'],
                    'start' => $attribution['dateDebut'],
                    'end' => $attribution['dateFin']
                ];
            }
            return new JsonResponse($data,200);
        }

        $errors = array();

        foreach ($form->getErrors() as $key => $error) {
            if ($form->isRoot()) {
                $errors['#'][] = $error->getMessage();
            } else {
                $errors[] = $error->getMessage();
            }
        }
        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getErrorMessages($child);
            }
        }

        return new JsonResponse([
            "errors" => $errors
        ],400);
    }

    /**
     * @Route("/api/attribution/create", name="api_attribution_create", methods={"POST"})
     */
    public function create(EntityManagerInterface $manager, Request $request = null) 
    {
        $json = $request->getContent();
        $data = json_decode($json, true);

        $attribution = new Attribution();
        $form = $this->createForm(AttributionType::class, $attribution);

        $form->submit($data);

        if ($form->isValid()) {
            $manager->persist($attribution);
            $manager->flush(); 
            return new JsonResponse([
                "type" => 'success',
                "message" => 'ajout effectuée'
            ],200);
        }

        return new JsonResponse([
            "type" => "danger",
            "message" => $form->getErrors(true)->__toString()
        ],400);
    }

    /**
     * @Route("/api/attribution/{id}/delete", name="api_attribution_delete", methods={"DELETE"})
     */
    public function delete(Attribution $attribution = null, EntityManagerInterface $manager) 
    {
        if ($attribution == null) {
            return new JsonResponse([
                "type" => 'danger',
                "message" => 'Attribution invalide'
            ],400);
        }

        $manager->remove($attribution);
        $manager->flush();
        return new JsonResponse([
            "type" => 'success',
            "message" => 'suppression effectuée'
        ],200);
    }

    /**
     * @Route("/api/attribution/{id}/read", name="api_attribution_read", methods={"GET"})
     */
    public function read(Attribution $attribution = null) 
    {
        if ($attribution == null) {
            return new JsonResponse([
                "type" => 'danger',
                "message" => 'Attribution invalide'
            ],400);
        }
        
        return $this->json($attribution,200, [], ['groups' => 'attribution:read']);
    }

    public function getErrorMessages(Form $form) {
        $errors = array();
    
        foreach ($form->getErrors() as $key => $error) {
            if ($form->isRoot()) {
                $errors['#'][] = $error->getMessage();
            } else {
                $errors[] = $error->getMessage();
            }
        }
    
        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getErrorMessages($child);
            }
        }
    
        return $errors;
    }
    
}
