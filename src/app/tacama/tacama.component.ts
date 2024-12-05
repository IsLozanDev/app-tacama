import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';

@Component({
  selector: 'app-tacama',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidemenuComponent],
  templateUrl: './tacama.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TacamaComponent implements OnInit {
  pageName: string | undefined;
  fixedPlugin: HTMLElement | undefined;
  fixedPluginButton: HTMLElement | undefined;
  fixedPluginButtonNav: HTMLElement | undefined;
  fixedPluginCard: HTMLElement | undefined;
  fixedPluginCloseButton: HTMLElement | undefined;
  navbar: HTMLElement | undefined;
  buttonNavbarFixed: HTMLInputElement | undefined;
  sidenav: HTMLElement | undefined;
  sidenav_target: string | undefined;
  whiteBtn: HTMLElement | undefined;
  darkBtn: HTMLElement | undefined;
  non_active_style: string[] | undefined;
  active_style: string[] | undefined;
  white_sidenav_classes: string[] = [];
  black_sidenav_classes: string[] = [];
  sidenav_highlight: HTMLElement | undefined;
  dark_mode_toggle: HTMLInputElement | undefined;
  root_html: HTMLElement | undefined;
  sidenav_trigger: HTMLElement | undefined;
  active_color: HTMLElement | undefined;

  ngOnInit(): void {
    this.pageName = window.location?.pathname.split('/').pop()?.split('.')[0];

    this.fixedPlugin = document.querySelector('[fixed-plugin]') as HTMLElement;
    this.fixedPluginButton = document.querySelector(
      '[fixed-plugin-button]'
    ) as HTMLElement;
    this.fixedPluginButtonNav = document.querySelector(
      '[fixed-plugin-button-nav]'
    ) as HTMLElement;
    this.fixedPluginCard = document.querySelector(
      '[fixed-plugin-card]'
    ) as HTMLElement;
    this.fixedPluginCloseButton = document.querySelector(
      '[fixed-plugin-close-button]'
    ) as HTMLElement;
    this.navbar = document.querySelector('[navbar-main]') as HTMLElement;
    this.buttonNavbarFixed = document.querySelector(
      '[navbarFixed]'
    ) as HTMLInputElement;
    this.sidenav = document.querySelector('aside') as HTMLElement;
    this.sidenav_trigger = document.querySelector(
      '[sidenav-trigger]'
    ) as HTMLElement;
    this.active_color = document.querySelector('[active_color]') as HTMLElement;

    this.initializeSidenav();
    this.initialMouseOver();
  }

  initialMouseOver() {
    window.addEventListener('click', (e) => {
      if (
        !this.sidenav?.contains(e.target as Node) &&
        !this.sidenav_trigger?.contains(e.target as Node)
      ) {
        if (this.sidenav?.getAttribute('aria-expanded') == 'true') {
          this.sidenav_trigger?.click();
        }
      }
    });
  }

  initializeSidenav(): void {
    this.sidenav_target = `../pages/${this.pageName}.html`;

    this.whiteBtn = document.querySelector('[transparent-style-btn]') as HTMLElement;
    this.darkBtn = document.querySelector('[white-style-btn]') as HTMLElement;

    this.non_active_style = [
      'bg-none',
      'bg-transparent',
      'text-white',
      'border-blue-500',
    ];
    this.active_style = [
      'bg-gradient-to-tl',
      'from-blue-500',
      'to-violet-500',
      'bg-blue-500',
      'text-white',
      'border-transparent',
    ];

    this.white_sidenav_classes = ['bg-white', 'shadow-xl', 'text-slate-850'];
    this.black_sidenav_classes = ['bg-slate-850', 'shadow-none'];

    this.sidenav_highlight = document.querySelector(`[ng-reflect-router-link]`) as HTMLElement;

    this.addEventListeners('right');
    // if (this.pageName !== "rtl") {
    // } else {
    //   this.addEventListeners("left");
    // }

    this.whiteBtn.addEventListener('click', () =>
      this.changeSidenavStyle(
        this.whiteBtn,
        this.darkBtn,
        this.white_sidenav_classes,
        this.black_sidenav_classes,
        false
      )
    );
    this.darkBtn.addEventListener('click', () =>
      this.changeSidenavStyle(
        this.darkBtn,
        this.whiteBtn,
        this.black_sidenav_classes,
        this.white_sidenav_classes,
        true
      )
    );

    this.initializeNavbar();
    // if (this.navbar) {
    // }

    this.dark_mode_toggle = document.querySelector('[dark-toggle]') as HTMLInputElement;
    this.root_html = document.querySelector('html') as HTMLElement;

    this.dark_mode_toggle.addEventListener('change', () => {
      this.dark_mode_toggle?.setAttribute('manual', 'true');
      if (this.dark_mode_toggle?.checked) {
        this.root_html?.classList.add('dark');

      } else {
        this.root_html?.classList.remove('dark');
        this.root_html?.classList.add('light');
      }
    });

    this.changeSidenavStyle(
      this.darkBtn,
      this.whiteBtn,
      this.black_sidenav_classes,
      this.white_sidenav_classes,
      true
    )
  }

  addEventListeners(position: string): void {
    this.fixedPluginButton?.addEventListener('click', () =>
      this.toggleFixedPluginCard(position)
    );
    this.fixedPluginButtonNav?.addEventListener('click', () =>
      this.toggleFixedPluginCard(position)
    );
    this.fixedPluginCloseButton?.addEventListener('click', () =>
      this.toggleFixedPluginCard(position)
    );

    window.addEventListener('click', (e) => {
      if (
        !this.fixedPlugin?.contains(e.target as Node) &&
        !this.fixedPluginButton?.contains(e.target as Node) &&
        !this.fixedPluginButtonNav?.contains(e.target as Node)
      ) {
        if (this.fixedPluginCard?.classList.contains(`${position}-0`)) {
          this.fixedPluginCloseButton?.click();
        }
      }
    });
  }

  toggleFixedPluginCard(position: string): void {
    this.fixedPluginCard?.classList.toggle(`-${position}-90`);
    this.fixedPluginCard?.classList.toggle(`${position}-0`);
  }

  changeSidenavStyle(
    activeBtn: HTMLElement | undefined,
    inactiveBtn: HTMLElement | undefined,
    activeClasses: string[],
    inactiveClasses: string[],
    isDark: boolean
  ): void {

    const active_style_attr = document.createAttribute('active-style');

    // if (!activeBtn?.hasAttribute("active-style")) {
    activeBtn?.setAttributeNode(active_style_attr);

    this.non_active_style?.forEach((style_class) => {
      activeBtn?.classList.remove(style_class);
    });

    this.active_style?.forEach((style_class) => {
      activeBtn?.classList.add(style_class);
    });

    inactiveBtn?.removeAttribute('active-style');

    this.active_style?.forEach((style_class) => {
      inactiveBtn?.classList.remove(style_class);
    });

    this.non_active_style?.forEach((style_class) => {
      inactiveBtn?.classList.add(style_class);
    });

    inactiveClasses.forEach((style_class) => {
      this.sidenav?.classList.remove(style_class);
    });
    activeClasses.forEach((style_class) => {
      this.sidenav?.classList.add(style_class);
    });

    if (isDark) {
      this.sidenav?.classList.add('dark');
    } else {
      this.sidenav?.classList.remove('dark');
    }
    // }
  }

  initializeNavbar(): void {
    this.buttonNavbarFixed?.setAttribute('checked', 'true');
    // if (this.navbar?.getAttribute('navbar-scroll') === 'true') {
    // }

    const white_elements = this.navbar?.querySelectorAll('.text-white');
    const white_bg_elements = this.navbar?.querySelectorAll(
      '[sidenav-trigger] i.bg-white'
    );
    const white_before_elements = this.navbar?.querySelectorAll(
      '.before\\:text-white'
    );

    this.buttonNavbarFixed?.addEventListener('change', () => {
      if (this.buttonNavbarFixed?.checked) {
        this.updateNavbarClasses(
          white_elements,
          white_bg_elements,
          white_before_elements,
          true
        );
      } else {
        this.updateNavbarClasses(
          white_elements,
          white_bg_elements,
          white_before_elements,
          false
        );
      }
    });
  }

  updateNavbarClasses(
    white_elements: NodeListOf<Element> | undefined,
    white_bg_elements: NodeListOf<Element> | undefined,
    white_before_elements: NodeListOf<Element> | undefined,
    isChecked: boolean
  ): void {
    white_elements = white_elements || document.querySelectorAll<Element>('');
    white_bg_elements =
      white_bg_elements || document.querySelectorAll<Element>('');
    white_before_elements =
      white_before_elements || document.querySelectorAll<Element>('');

    if (isChecked) {
      white_elements.forEach((element) => {
        element.classList.remove('text-white');
        element.classList.add('dark:text-white');
      });
      white_bg_elements.forEach((element) => {
        element.classList.remove('bg-white');
        element.classList.add('dark:bg-white');
        element.classList.add('bg-slate-500');
      });
      white_before_elements.forEach((element) => {
        element.classList.add('dark:before:text-white');
        element.classList.remove('before:text-white');
      });
      this.navbar?.setAttribute('navbar-scroll', 'true');
      this.navbar?.classList.add(
        'sticky',
        'top-[1%]',
        'backdrop-saturate-200',
        'backdrop-blur-2xl',
        'dark:bg-slate-850/80',
        'dark:shadow-dark-blur',
        'bg-[hsla(0,0%,100%,0.8)]',
        'shadow-blur',
        'z-110'
      );
    } else {
      this.navbar?.setAttribute('navbar-scroll', 'false');
      this.navbar?.classList.remove(
        'sticky',
        'top-[1%]',
        'backdrop-saturate-200',
        'backdrop-blur-2xl',
        'dark:bg-slate-850/80',
        'dark:shadow-dark-blur',
        'bg-[hsla(0,0%,100%,0.8)]',
        'shadow-blur',
        'z-110'
      );
      white_elements.forEach((element) => {
        element.classList.add('text-white');
        element.classList.remove('dark:text-white');
      });
      white_bg_elements.forEach((element) => {
        element.classList.add('bg-white');
        element.classList.remove('dark:bg-white');
        element.classList.remove('bg-slate-500');
      });
      white_before_elements.forEach((element) => {
        element.classList.remove('dark:before:text-white');
        element.classList.add('before:text-white');
      });
    }
  }

  onClickToggle() {
    var sidenav = document.querySelector('aside');

    if (sidenav?.getAttribute('aria-expanded') == 'false') {
      sidenav.setAttribute('aria-expanded', 'true');
    } else {
      sidenav?.setAttribute('aria-expanded', 'false');
    }

    sidenav?.classList.toggle('translate-x-0');
    sidenav?.classList.toggle('ml-6');
    sidenav?.classList.toggle('shadow-xl');

    var sidenav_trigger = document.querySelector('[sidenav-trigger]');

    var burger = sidenav_trigger?.firstElementChild;
    var top_bread = burger?.firstElementChild;
    var bottom_bread = burger?.lastElementChild;

    top_bread?.classList.toggle('translate-x-[5px]');
    bottom_bread?.classList.toggle('translate-x-[5px]');
  }

  sidebarColor(a: HTMLElement): void {
    const color = a.getAttribute('data-color');
    const parent = a.parentElement?.children;
    let activeColor: string | null = null;
    let activeSidenavIconColorClass: string | undefined;

    const checkedSidenavIconColor = `bg-${color}-500/30`;

    // const sidenavIcon = document.querySelector(`a[class="${CSS.escape(this.sidenav_target || '')}"]`) as HTMLElement;

    // const sidenavIcon = document.querySelector('.a[class="bg-blue-600"]') as HTMLElement;
    // or
    // const sidenavIcon = Array.from(document.getElementsByClassName('.bg-blue-600')) as HTMLElement[];

    // const sidenavIcon = document.querySelector(`a[href="${CSS.escape(this.sidenav_target || '')}"]`) as HTMLElement;

    const buttonRouteActive = document.querySelector(
      'ul>li>a[class$="-500/30"]'
    );
    let sidenavIcon = document.querySelector(
      'body > app-root > app-tacama > aside > div.items-center.block.w-auto.max-h-screen.overflow-auto.h-sidenav.grow.basis-full > app-sidemenu > ul > li > a.bg-blue-600'
    );
    if (!sidenavIcon) {
      sidenavIcon = document.querySelector('ul>li>a[class$="-500/30"]');
    }

    console.log(sidenavIcon);
    console.log('buttonRouteActive', buttonRouteActive);

    if (parent) {
      for (let i = 0; i < parent.length; i++) {
        const element = parent[i] as HTMLElement;
        if (element.hasAttribute('active-color')) {
          activeColor = element.getAttribute('data-color');

          element.classList.toggle('border-white');
          element.classList.toggle('border-slate-700');

          activeSidenavIconColorClass = `bg-${activeColor}-500/30`;
        }
        element.removeAttribute('active-color');
      }
    }

    const att = document.createAttribute('active-color');
    a.setAttributeNode(att);
    a.classList.toggle('border-white');
    a.classList.toggle('border-slate-700');

    // Remove active style
    if (activeSidenavIconColorClass) {
      sidenavIcon?.classList.remove('bg-blue-600');
      sidenavIcon?.classList.remove(activeSidenavIconColorClass);
    }

    // Add new style
    sidenavIcon?.classList.add(checkedSidenavIconColor);
  }

  onColorClick($event: Event) {
    const target = $event.target as HTMLElement;

    this.sidebarColor(target);
  }
}
