import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupManagerService } from './group-manager.service';
import { Group } from '../models/group.model';

import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'prism-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css']
})

export class GroupManagerComponent implements OnInit {
  displayAdd: Boolean = false;
  displayDelete: Boolean = false;
  displayGroupManager: Boolean = false;
  group: Group = new Group();
  groups: Group[] = [];
  filteredMembers: Group[] = [];
  msgs: Message[] = [];

  constructor(private groupManagerService: GroupManagerService, private router: Router) { }

  ngOnInit() {
    this.groupManagerService.getGroups().subscribe(data => {
      this.groups = data;
      console.log(data);
    });
  }

  addGroupDialog() {
    this.msgs = [];
    this.group = new Group();
    this.displayAdd = true;
  }

  deleteGroupDialog() {
    this.displayDelete = true;
    this.group = new Group();
  }

  groupManagerDialog(id) {
    this.msgs = [];
    this.displayGroupManager = true;
    this.groupManagerService.getGroup(id).subscribe(
      data => this.group = data
    );
  }

  submitGroup() {
    this.groupManagerService.addGroup(this.group).subscribe(
      data => {
        this.groups.push(data);
        this.groups = this.groups.slice(0);
      }
    );

    if (typeof(this.group.name) !== 'undefined') {
      this.displayAdd = false;
      this.group = new Group();
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Empty Group Name:', detail: 'Please input a group name.'});
    }
  }

  deleteGroup(id) {
    this.groupManagerService.deleteGroup(id).subscribe( () => {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i]._id === id) {
          this.groups.splice(i, 1);
          this.groups = this.groups.slice(0);
          break;
        }
      }
    });

    this.displayDelete = false;
    this.group = new Group();
  }

  updateGroup(group) {
    this.groupManagerService.updateGroup(this.group).subscribe( updatedGroup => {
      const index = this.groups.findIndex(oldGroup => oldGroup._id === updatedGroup._id);
      this.groups[index] = updatedGroup;
    });

    this.displayGroupManager = false;
    this.group = new Group();
  }
}
