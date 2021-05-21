<?php

namespace App\Form;

use App\Entity\Attribution;
use App\Entity\Ordinateur;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AttributionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dateDebut', DateTimeType::class, [
                'date_widget' => 'single_text'
            ])
            ->add('dateFin', DateTimeType::class, [
                'date_widget' => 'single_text'
            ])
            ->add('ordinateur', EntityType::class,[
                'label' => 'Ordinateur',
                'class' => Ordinateur::class,
                'choice_label' => 'modele',
                'choice_value' => 'id'
            ])
            ->add('user', EntityType::class,[
                'label' => 'Utilisateur',
                'class' => User::class,
                'choice_label' => 'email',
                'choice_value' => 'id'
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Attribution::class,
        ]);
    }
}
