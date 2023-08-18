import { Component, Input, OnInit } from '@angular/core';

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
interface Item {
  image: string;
  title: string;
  description: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  items: Item[] = [];
  responsiveOptions: ResponsiveOptions[] | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [{
      image: '../../../assets/images/banner_guayaquil.jpg',
      alt: 'banner_guayaquil',
      description: 'Guayaquil',
      title: 'Guayaquil'
    },
    {
      image: '../../../assets/images/banner_quito.jpg',
      alt: 'banner_quito',
      description: 'Quito',
      title: 'Quito'
    }, {
      image: '../../../assets/images/banner_guayaquil2.webp',
      alt: 'banner_guayaquil2',
      description: 'Guayaquil',
      title: 'Guayaquil'
    }, {
      image: '../../../assets/images/banner_quito2.jpg',
      alt: 'banner_quito',
      description: 'Quito',
      title: 'Quito'
    }
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
