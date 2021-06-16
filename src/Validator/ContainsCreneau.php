<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ContainsCreneau extends Constraint
{
    public $message = 'Ce créneau n\'est pas libre';

    public function validatedBy()
    {
        return static::class.'Validator';
    }
    
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }

}