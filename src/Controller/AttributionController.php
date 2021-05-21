<?php

namespace App\Controller;

use App\Entity\Attribution;
use App\Form\AttributionType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AttributionController extends AbstractController
{
    /**
     * @Route("/attribution", name="attribution")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $attribution = new Attribution();

        $form = $this->createForm(AttributionType::class, $attribution);

        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {

            $manager->persist($attribution);
            $manager->flush();

            return $this->redirectToRoute('attribution');
        }
        
        return $this->render('attribution/index.html.twig', [
            'controller_name' => 'AttributionController',
            'form' => $form->createView()
        ]);
    }

}
