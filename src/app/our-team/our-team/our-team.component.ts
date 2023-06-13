import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  public teamGalleryPictures = [
    {src: 'assets/images/our_team.png'},
    {src: 'assets/images/our_team_2.png'},
  ];
  public teamMembers: { src: string, name: string, color: string, role: string, description: string }[] = []

  public ourBosses = {src: 'assets/images/our_bosses.png'};
  constructor() {
  }

  ngOnInit(): void {
    this.teamMembers = [
      {
        src: 'assets/images/team_member_1.png',
        name: "Derek Nguyen",
        color: "66391b",
        role: "COO",
        description: "Derek has a background in finance and entrepreneurship, but his love of plants and sustainability led him to Leaf and Loom. As the COO, Derek oversees the day-to-day operations of the company and works to ensure that Leaf and Loom is fulfilling its mission to create a more plant-filled world. \n"
      },
      {
        src: 'assets/images/team_member_2.png',
        name: "Samantha",
        color: "f7b4b4",
        role: "CEO",
        description: "Samantha grew up on a farm in rural Wallis and has always had a love for plants and nature. After studying business in college, she worked in the tech industry for several years before realizing her true passion lay in connecting people with the beauty and joy of plants. \n" +
          "\n" +
          "Samantha co-founded Leaf and Loom with a mission to make it easy for anyone to become a plant parent and transform their living spaces into green sanctuaries. \n"
      },
      {
        src: 'assets/images/team_member_3.png',
        name: "Julio Rodriguez",
        color: "3e3e3f",
        role: "Logistics Manager",
        description: "Julio grew up in a small town in Bapelfingen, surrounded by lush pine forests. After completing his degree in logistics management, he moved to New York City to pursue a career in the field. \n" +
          "\n" +
          "He is responsible for making sure that all plants are shipped efficiently and arrive at their destination in perfect condition."
      },
      {
        src: 'assets/images/team_member_4.png',
        name: "Rachel Nguyen",
        color: "fa5955",
        role: "Customer Service Manager",
        description: "Originally from Winterthur, Rachel has always had a love for the natural world. She graduated with a degree in environmental science and worked for several non-profits before joining Loom and Leaf. \n" +
          "\n" +
          "With her vast knowledge of plants and environmental sustainability, Rachel ensures that customers receive the best possible support and guidance in caring for their green friends."
      }
    ];
  }
}
