<?php

namespace App\Repository;

use App\Entity\Attribution;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Attribution|null find($id, $lockMode = null, $lockVersion = null)
 * @method Attribution|null findOneBy(array $criteria, array $orderBy = null)
 * @method Attribution[]    findAll()
 * @method Attribution[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AttributionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Attribution::class);
    }

    // /**
    //  * @return Attribution[] Returns an array of Attribution objects
    //  */
    public function creneaulibre($ordi_id, $dateDebut, $dateFin)
    {
        return $this->createQueryBuilder('a')
            ->select('count(a)')
            ->where('a.ordinateur = :val AND a.dateDebut > :val1 AND a.dateDebut < :val2 ')
            ->orWhere('a.ordinateur = :val AND a.dateFin > :val1 AND a.dateDebut < :val2 ')
            ->setParameter('val', $ordi_id)
            ->setParameter('val1', $dateDebut)
            ->setParameter('val2',$dateFin)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getAttribution($startDate, $endDate)
    {
        return $this->createQueryBuilder('a')
            ->where('a.dateDebut > :val1 AND a.dateDebut < :val2 ')
            ->orWhere('a.dateFin > :val1 AND a.dateDebut < :val2 ')
            ->setParameter('val1', $startDate)
            ->setParameter('val2',$endDate)
            ->getQuery()
            ->getResult()
        ;
    }

}
