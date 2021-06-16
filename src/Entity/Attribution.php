<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator as AcmeAssert;
use DateTime;
use DateTimeZone;
/**
 * @ORM\Table(name="attribution")
 * @ORM\Entity(repositoryClass="App\Repository\AttributionRepository")
 * @AcmeAssert\ContainsCreneau
 */
class Attribution
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("attribution:read")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Ordinateur::class, inversedBy="attributions",cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("attribution:read")
     * @Assert\NotNull
     * 
     */
    private $ordinateur;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="attributions",cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups("attribution:read")
     * @Assert\NotNull
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("attribution:read")
     * @Assert\NotNull
     * @Assert\GreaterThan("+4 hours")
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("attribution:read")
     * @Assert\NotNull
     * @Assert\GreaterThan(propertyPath="dateDebut")
     */
    private $dateFin;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrdinateur(): ?Ordinateur
    {
        return $this->ordinateur;
    }

    public function setOrdinateur(?Ordinateur $ordinateur): self
    {
        $this->ordinateur = $ordinateur;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }
}
