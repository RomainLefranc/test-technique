<?php

namespace App\Validator;

use App\Repository\AttributionRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class ContainsCreneauValidator extends ConstraintValidator
{
    public function __construct(AttributionRepository $AttributionRepository)
    {
        $this->attributionRepository = $AttributionRepository;
    }


    public function validate($protocol, Constraint $constraint)
    {
        $test = $this->attributionRepository->creneaulibre($protocol->getOrdinateur()->getId(),$protocol->getDateDebut(), $protocol->getDateFin());
    
            if ($test[0][1] >= 1) {
                $this->context->buildViolation($constraint->message)
                ->addViolation();
            }
    }
}