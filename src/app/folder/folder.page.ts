import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    switch (this.activatedRoute.snapshot.paramMap.get('id')) {
      case 'Vitrin':
        this.folder = 'Vitrin';
        break;
      default:
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        break;
    }
  }

}
