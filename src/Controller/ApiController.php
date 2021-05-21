<?php

namespace App\Controller;

use App\Entity\Attribution;
use App\Repository\AttributionRepository;
use App\Repository\OrdinateurRepository;
use App\Repository\UserRepository;
use DateTime;
use DateTimeZone;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Required;

class ApiController extends AbstractController
{


    /**
     * @Route("/api/attribution", name="api_attribution_home", methods={"POST"})
     */
    public function index(AttributionRepository $attributionRepository, NormalizerInterface $normalizer, Request $request, ValidatorInterface $validator) {
        
        $jsonReçu = $request->getContent();
        $donnees = json_decode($jsonReçu);
    
  /*       $constraint = new Assert\Collection([
            'start' =>  new Assert\DateTime("Y-m-d'T'H:i:s'.000Z'"),
            'end' => new Assert\DateTime('c')
        ]);

        $errors = $validator->validate(
            ['start' => $donnees->start, 'end' => $donnees->end],
            $constraint
        );

        if(count($errors) > 0) {
            //Return bad fields
            $errorsString = (string) $errors;
            return $this->json($errorsString, 400);
        } */
     
        $attributions = $attributionRepository->getAttribution($donnees->start, $donnees->end);
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
        $json = json_encode($data);

        $response = new Response($json, 200, [
            'Content-Type' => "application/json"
        ]);

        return $response;
    }

    /**
     * @Route("/api/attribution/create", name="api_attribution_create", methods={"POST"})
     */
    public function create(
        UserRepository $userRepository, 
        OrdinateurRepository $ordinateurRepository, 
        AttributionRepository $attributionRepository,
        EntityManagerInterface $manager, 
        Request $request, 
        SerializerInterface $serializer) {

        $jsonReçu = $request->getContent();
        $donnees = json_decode($jsonReçu);
        $date = new DateTime('now', new DateTimeZone('Indian/Reunion'));
        $date = $date->format(DateTime::ATOM);
        
        /* Si la date de debut est passé */
        if ($donnees->dateDebut < $date) {
            return new Response('date passé', 200, [
                'Content-Type' => "application/json"
            ]);
        }
        
        /* Si il y a déjà une reservation pour cette ordinateur dans ce creneau horaire */
        $test = $attributionRepository->creneaulibre($donnees->ordinateur->id,$donnees->dateDebut, $donnees->dateFin);
        if ($test[0][1] >= 1) {
            $json = [
                'reponse' => 'ordinateur non disponible'
            ];
            $json = json_encode($json);
    
            $response = new Response($json, 200, [
                'Content-Type' => "application/json"
            ]);
            return $response;
        }


        $attribution = $serializer->deserialize($jsonReçu, Attribution::class, 'json');
        $attribution->setOrdinateur($ordinateurRepository->find($donnees->ordinateur->id));
        $attribution->setUser($userRepository->find($donnees->user->id));


        $manager->persist($attribution);
        $manager->flush();
        
        
        $json = [
            'reponse' => 'ajout effectuée'
        ];
        $json = json_encode($json);

        $response = new Response($json, 200, [
            'Content-Type' => "application/json"
        ]);

        return $response;
    }

    /**
     * @Route("/api/attribution/{id}/delete", name="api_attribution_delete", methods={"DELETE"})
     */
    public function delete(Attribution $attribution, EntityManagerInterface $manager) {

        $manager->remove($attribution);
        $manager->flush();

        $json = [
            'reponse' => 'suppression effectuée'
        ];
        $json = json_encode($json);

        $response = new Response($json, 200, [
            'Content-Type' => "application/json"
        ]);

        return $response;
    }

        /**
     * @Route("/api/attribution/{id}/read", name="api_attribution_read", methods={"GET"})
     */
    public function read(Attribution $attribution) {

        return $this->json($attribution,200, [], ['groups' => 'attribution:read']);

    }

}
