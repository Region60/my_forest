import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Mail } from './mail.enum';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService) {}

  private async createListContact(theme: string) {
    return await this.httpService.axiosRef.post(
      `${Mail.HOSTMAIL}createList?format=json&api_key=${process.env.MAIL_API_KEY}&title=${theme}`,
    );
  }

  private registerMailCreator(randomString: string, recipientName: string) {
    return `<h2>Здраствуйте ${recipientName}</h2>  Для завершения регистрации перейдите по ссылке:
    <p>
    <a href=" ${process.env.URL}/auth/confirm/${randomString}">Подверждение электронной почты</a>
    </p> 
    <p>Если вы получили это письмо случайно, просто удалите его</p>`;
  }

  async createMailMessage(link: string, recipientName: string) {
    const listId = await this.createListContact('register');
    return await this.httpService.post(
      `${Mail.HOSTMAIL}createEmailMessage?format=json&api_key=${
        process.env.MAIL_API_KEY
      }&sender_name=ThressCo&sender_email=${
        Mail.SENDER_EMAIL
      }&subject=registration&body=${this.registerMailCreator(
        link,
        recipientName,
      )}&list_id=${listId}`,
    );
  }

  private async getList() {
    //console.log({api:`${Mail.HOSTMAIL}sendEmail?format=json&api_key=${process.env.MAIL_API_KEY}&email=${email}&sender_name=Admin&sender_email=${email}&subject=Registration&body=$>>>>><<<<<&list_id=${this.getList}&error_checking=1&track_read=1`})

    const list = await this.createListContact('register');
    const response = await this.httpService.axiosRef.post(
      `${Mail.HOSTMAIL}getLists?format=json&api_key=${process.env.MAIL_API_KEY}`,
    );
    return response;
  }

  async sendMessageReg(
    email: string,
    randomString: string,
    recipientName: string,
  ) {
    const encodingUri = encodeURI(
      `${Mail.HOSTMAIL}sendEmail?format=json&api_key=${
        process.env.MAIL_API_KEY
      }&email=${email}&sender_name=Admin&sender_email=${
        Mail.SENDER_EMAIL
      }&subject=Registration&list_id=37&error_checking=1&track_read=1&body=${this.registerMailCreator(
        randomString,
        recipientName,
      )}`,
    );
    const response = await this.httpService.axiosRef.post(encodingUri);
    if (response.data.error)
      console.log({ mailServiceError: response.data.error });
  }
}
