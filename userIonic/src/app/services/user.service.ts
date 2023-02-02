import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";
import {NavController} from "@ionic/angular";
import {Usuario} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  userURL = 'http://localhost:3000/user/';
  token: string | any = null;
  usuario: Usuario =
    {
      _id: '',
      avatar: '',
      nombre: '',
      email: '',
      password: '',
    };

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController)
  {
    this.init();
  }

  login(email: string, password: string)
  {
    const data = {email, password};
    return new Promise(resolve =>
    {
      this.http.post(`${this.userURL}login`, data).subscribe(this.promesaGuardaToken(resolve));
    });
  }

  private async init()
  {
    // Iniciamos el storage de la base de datos de ionic
    await this.storage.create();
  }

  private promesaGuardaToken(resolve: (value: (PromiseLike<unknown> | unknown)) => void)
  {
    return async (resp: any) =>
    {
      if (resp.ok)
      {
        // Si el login es correcto guardamos el token en el storage
        await this.GuardaToken(resp.token);
        resolve(true);
      }
      else
      {
        // Si eno es correcto el login, borramos el token
        this.token = null;
        this.storage.clear();
        resolve(false);
      }
    };
  }

  private async GuardaToken(token: string)
  {
    // Guardamos el token en el storage de ionic
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken()
  {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>
  {
    // Cargamos el token del storage
    await this.cargarToken();

    // Si no existe el token directamente salimo devolviendo una promesa a false
    if (!this.token)
    {
      this.navCtrl.navigateRoot('login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve =>
    {
      const headers = new HttpHeaders(
        {
          'x-token': this.token
        });

      this.http.get(`${this.userURL}user`, {headers}).subscribe((resp:any) =>
      {
        console.log(resp);
        if (resp.ok)
        {
          // Si la respuesta es ok true, guardamos el user y resolvemos la promesa como true
          this.usuario = resp.usuario;
          resolve(true);
        }
        else
        {
          // Si la respuesta es ok false, devolvemos la promesa como false
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    })
  }

  registro(usuario: Usuario): Promise<any>
  {
    return new Promise(resolve =>
    {
      this.http.post(`${this.userURL}register`, usuario).subscribe(this.promesaGuardaToken(resolve));
    }).catch(err =>
    {
      console.log(err);
    });
  }
}
