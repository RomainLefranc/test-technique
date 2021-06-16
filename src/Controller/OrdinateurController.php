<?php

namespace App\Controller;

use App\Entity\Ordinateur;
use App\Form\OrdinateurType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrdinateurController extends AbstractController
{
    /**
     * @Route("/ordinateur", name="ordinateur")
     */
    public function index(): Response
    {
        $repository = $this->getDoctrine()->getRepository(Ordinateur::class);

        $ordinateurs = $repository->findAll();

        return $this->render('ordinateur/index.html.twig', [
            'controller_name' => 'OrdinateurController',
            'ordinateurs' => $ordinateurs
        ]);
    }

    /**
     * @Route("/ordinateur/creer", name="ordinateur_creer")
     * @Route("/ordinateur/{id}/modifier", name="ordinateur_modifier")
     */
    public function form(Ordinateur $ordinateur = null, Request $request, EntityManagerInterface $manager)
    {
        if (!$ordinateur) {
            $ordinateur = new Ordinateur();
        }

        $form = $this->createForm(OrdinateurType::class, $ordinateur);
        
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($ordinateur);
            $manager->flush();

            return $this->redirectToRoute('ordinateur');
        }
        return $this->render('ordinateur/creer.html.twig', [
            'form' => $form->createView(),
            'editMode' => $ordinateur->getId() !== null
        ]);
    }

    /**
     * @Route("/ordinateur/{id}/supprimer", name="ordinateur_supprimer")
     */
    public function delete(Ordinateur $ordinateur, EntityManagerInterface $manager) {

        $manager->remove($ordinateur);
        $manager->flush();
        return $this->redirectToRoute('ordinateur');

    }

}
