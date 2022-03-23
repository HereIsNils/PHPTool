import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SingleDevUser, SingleTestUser } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';

@Component({
  selector: 'app-php-tool',
  templateUrl: './php-tool.component.html',
  styleUrls: ['./php-tool.component.scss']
})
export class PhpToolComponent implements OnInit {

  devUsers?: SingleDevUser[];
  testUsers?: SingleTestUser[];
  private userDataChangeSubscription: Subscription;

  constructor(private phpToolService: PhpToolService) { 
    this.userDataChangeSubscription = phpToolService.onUserDataChange().subscribe(() => this.refreshData())
  }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.userDataChangeSubscription.unsubscribe()
  }
  
  public refreshData(): void {
    this.devUsers = this.phpToolService.getDevUsers();
    this.testUsers = this.phpToolService.getTestUsers();
  }
}
