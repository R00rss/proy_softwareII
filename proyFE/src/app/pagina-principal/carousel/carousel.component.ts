import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  currentIndex: number = 0;

  ngOnInit(): void {
    // Tu lógica para inicializar el carrusel y las pestañas
    const slider = document.querySelector(".slider") as HTMLElement;
    const leftArrow = document.querySelector(".left") as HTMLElement;
    const rightArrow = document.querySelector(".right") as HTMLElement;
    const slides = document.querySelectorAll(".slide");
    
    // Función para mostrar la imagen actual
    const showSlide = (index: number): void => {
      slides.forEach((slide, i) => {
        if (i === index) {
          (slide as HTMLElement).style.display = "block";
        } else {
          (slide as HTMLElement).style.display = "none";
        }
      });
    };
    
    // Eventos de flechas para el carrusel
    leftArrow.addEventListener("click", () => {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = slides.length - 1;
      }
      showSlide(this.currentIndex);
    });
    
    rightArrow.addEventListener("click", () => {
      this.currentIndex++;
      if (this.currentIndex >= slides.length) {
        this.currentIndex = 0;
      }
      showSlide(this.currentIndex);
    });
    
    // Mostrar la primera imagen al cargar la página
    showSlide(this.currentIndex);
    
    // Eventos de pestañas
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => (content as HTMLElement).style.display = "none");

        tab.classList.add("active");
        (tabContents[index] as HTMLElement).style.display = "block";
      });
    });
  }
}