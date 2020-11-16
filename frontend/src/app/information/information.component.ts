import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  private type: string;

  public text = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.type = params['type'];
    this.setText();
    });
  }

  setText() {
    this.text = "";
    this.http.get('assets/information/' + this.type + '.txt', {responseType: 'text'}).subscribe(data => {
    for (const line of data.split(/[\r\n]+/)) {
      this.text += '<p>' + line + '</p>';
    }
    });
  }

}
