import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseUser} from "../../models/base-user.models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-avatar-thumbnail',
  templateUrl: './avatar-thumbnail.component.html',
  styleUrls: ['./avatar-thumbnail.component.css']
})
export class AvatarThumbnailComponent implements OnInit {
  @Input() user!: BaseUser;
  @Input() size = 40;
  @Input() hidePresence = false;
  @Input() includeMdList = true;

  @Output() clicked = new EventEmitter();

  presence$!: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    // this.presence$ = this.store.select(
    //   fromPresence.isCustomerUserOnline(this.user)
    // );
  }

  onClicked(): void {
    this.clicked.emit(this.user);
  }
}
