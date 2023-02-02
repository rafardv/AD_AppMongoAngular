import {Component, OnInit, ViewChild} from '@angular/core';
import Swiper from "swiper";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {NavController} from "@ionic/angular";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
  @ViewChild('slidePrincipal', {static: true}) slides!: Swiper;
  loginUser: FormGroup = this.formBuilder.group(
    {
      email: [''],
      password: ['']
    });
  registerUser: FormGroup = this.formBuilder.group(
    {
      email: [''],
      password: [''],
      nombre: [''],
      avatar: ['']
    })
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
  constructor(private formBuilder: FormBuilder, private userService: UserService, private navCtrl: NavController,
              private uiService: UiService) { }

  ngOnInit()
  {
    this.slides.isLocked;
  }

  async login(fLogin: any)
  {
    console.log(fLogin.valid);
    if (fLogin.invalid)
    {
      return;
    }
    const valido = await this.userService.login(this.loginUser.controls['email'].value, this.loginUser.controls['password'].value);
    if (valido)
    {
      this.navCtrl.navigateRoot('/series', {animated: true});
    }
    else
    {
      this.uiService.alertInformativa('Usuario y contraseña incorrectas');
    }
  }

  async registro(fRegistro: any)
  {
    console.log(fRegistro.valid);
    if (fRegistro.invalid)
    {
      return;
    }
    const valido = await this.userService.registro(this.registerUser.getRawValue());
    if (valido)
    {
      // Navegar
      this.navCtrl.navigateRoot('/series', {animated: true});
    }
    else
    {
      // Mostar alerta de email repetido
      this.uiService.alertInformativa('Ese correo electrónico ya existe');
    }
  }

  seleccionarAvatar(avatar: { img: string; selccionado: boolean })
  {
    this.avatars.forEach(av => av.selccionado = false);
    avatar.selccionado = true;
    this.registerUser.controls['avatar'].setValue(avatar.img);
  }

  mostrarRegistro()
  {
    this.slides.isLocked;
    this.slides.slideTo(0);
    this.slides.isLocked;
  }

  mostrarLogin()
  {
    this.slides.slideTo(1);
  }
}
