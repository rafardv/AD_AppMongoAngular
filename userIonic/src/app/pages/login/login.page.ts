import {Component, OnInit, ViewChild} from '@angular/core';
import Swiper from "swiper";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
  @ViewChild('slidePrincipal', {static: true}) slides!: Swiper;
  avatars: {img: string; selccionado: boolean}[] =
    [
      {
        img: 'av-1.png',
        selccionado: true
      },
      {
        img: 'av-2.png',
        selccionado: true
      },
      {
        img: 'av-3.png',
        selccionado: true
      },
      {
        img: 'av-4.png',
        selccionado: true
      },
      {
        img: 'av-5.png',
        selccionado: true
      },
      {
        img: 'av-6.png',
        selccionado: true
      },
      {
        img: 'av-7.png',
        selccionado: true
      }
    ];

  avatarSlide = {
    slidesPerView: 3.4
  }
  constructor() { }

  ngOnInit()
  {
    this.slides.isLocked;
  }

  login(fLogin: NgForm)
  {
    console.log(fLogin.valid);
  }

  registro(fRegistro: NgForm)
  {
    console.log(fRegistro.valid);
  }

  seleccionarAvatar(avatar: { img: string; selccionado: boolean })
  {
    this.avatars.forEach(av => av.selccionado = false);
    avatar.selccionado = true;
  }

  mostrarRegistro()
  {
    this.slides.isLocked;
    this.slides.slideTo(0);
    this.slides.isLocked;
  }

  mostrarLogin()
  {
    this.slides.isLocked;
    this.slides.slideTo(1);
    this.slides.isLocked;
  }
}
