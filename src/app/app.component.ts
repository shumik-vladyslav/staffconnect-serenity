import {Component, ElementRef, Renderer, ViewChild} from '@angular/core';
import {ContentService} from "./shared/service/content.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    menuClick: boolean;

    menuButtonClick: boolean;

    topbarMenuButtonClick: boolean;

    topbarMenuClick: boolean;

    topbarMenuActive: boolean;

    activeTopbarItem: Element;

    layoutStatic: boolean;

    sidebarActive: boolean;

    mobileMenuActive: boolean;

    darkMenu: boolean;

   tabs = [];

    constructor(public renderer: Renderer, private contentService: ContentService) {
      this.tabs = this.contentService.getTabs();

      this.contentService.onTabsChange.subscribe(() => {
        this.tabs = this.contentService.getTabs();
      });
    }

    onWrapperClick() {
        if (!this.menuClick && !this.menuButtonClick) {
            this.mobileMenuActive = false;
        }

        if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
            this.topbarMenuActive = false;
            this.activeTopbarItem = null;
        }

        this.menuClick = false;
        this.menuButtonClick = false;
        this.topbarMenuClick = false;
        this.topbarMenuButtonClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick = true;

        if (this.isMobile()) {
            this.mobileMenuActive = !this.mobileMenuActive;
        }

        event.preventDefault();
    }

    onTopbarMobileMenuButtonClick(event: Event) {
        this.topbarMenuButtonClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        event.preventDefault();
    }

    onTopbarRootItemClick(event: Event, item: Element) {
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null; } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onTopbarMenuClick(event: Event) {
        this.topbarMenuClick = true;
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    onToggleMenuClick(event: Event) {
        this.layoutStatic = !this.layoutStatic;
    }

    isMobile() {
        return window.innerWidth < 640;
    }


  selectTab(tab){
    for(let item of this.tabs){
      item.showTab = false;
    }

    tab.showTab = true;
  }

  removeTab(tab){
    this.contentService.removeTab(tab.id);
  }
}
