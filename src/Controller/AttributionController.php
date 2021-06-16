<?php

namespace App\Controller;

use App\Entity\Attribution;
use App\Form\AttributionType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AttributionController extends AbstractController
{
    /**
     * @Route("/attribution", name="attribution")
     */
    public function index(): Response
    {
        $attribution = new Attribution();

        $form = $this->createForm(AttributionType::class, $attribution);
        
        return $this->render('attribution/index.html.twig', [
            'controller_name' => 'AttributionController',
            'form' => $form->createView()
        ]);
    }

}
