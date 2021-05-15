import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hiv',
  templateUrl: './hiv.component.html',
  styleUrls: ['./hiv.component.scss']
})
export class HivComponent implements OnInit {
  infoCards = [
    {title: "What is HIV?", content: "HIV (human immunodeficiency virus) is a virus that attacks the body’s immune system. If HIV is not treated, it can lead to AIDS (acquired immunodeficiency syndrome)", image: "../../assets/images/hiv.jpg"},
    {title: "How is HIV transmitted?", content: "Most people who get HIV get it through anal or vaginal sex, or sharing needles, syringes, or other drug injection equipment (for example, cookers). But there are powerful tools that can help prevent HIV transmission.", image: "../../assets/images/hiv-causes.jpg"},
    {title: "How can you prevent HIV?", content: "Today, more tools than ever are available to prevent HIV. You can use strategies such as abstinence (not having sex), never sharing needles, and using condoms the right way every time you have sex. You may also be able to take advantage of HIV prevention medicines such as pre-exposure prophylaxis (PrEP) and post-exposure prophylaxis (PEP). ", image: "../../assets/images/hiv-prevention.png"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
