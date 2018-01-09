import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ContentService {
    tabs = [
      {
        id: 1,
        type: "users",
        showTab: true,
        label: "Users"
      },
      {
        id: 2,
        type: "user",
        showTab: false,
        label: "Timy",
        userId: 111
      },
      {
        id: 3,
        type: "user",
        showTab: false,
        label: "Alex",
        userId: 2220
      },
      {
        id: 4,
        type: "calendar",
        showTab: false,
        label: "Calendar"
      }
    ];

    public onTabsChange: EventEmitter<any> = new EventEmitter<any>();

    constructor()
    {
    }

    getTabs(){
      return this.tabs;
    }

    addTab(item){
      this.hideAllTabs();
      if (item.userId){
        this.tabSearch(item, 'userId');
      } else {
        this.tabSearch(item, 'type');
      }
    }

    tabSearch(item, type){
      let flag = true;
      for (let tab of this.tabs){
        if (item[type] === tab[type]){
          tab.showTab = true;

          flag = false;

          this.onTabsChange.emit("");
        }
      }
      if (flag){
        this.addNewTab(item);
      }
    }

    addNewTab(item){
      if (!item.id) {
        item.id = this.tabs[this.tabs.length - 1].id + 1;
      }
      console.log(item)

      this.tabs.push(item);

      this.onTabsChange.emit("");
    }

    removeTab(id){
        for (let i = 0; i < this.tabs.length; i++){
          let tab = this.tabs[i];

          if (id === tab.id){
            this.tabs.splice(i, 1);
          }
        }

      this.onTabsChange.emit("");
    }

  hideAllTabs(){
    for(let tab of this.tabs){
      tab.showTab = false;
    }
  }
}
