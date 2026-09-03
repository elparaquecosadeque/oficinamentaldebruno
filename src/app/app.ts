import { AfterViewInit, Component, ElementRef, OnDestroy, signal } from '@angular/core';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

class PhotoRotator {
  readonly index = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  constructor(private readonly length: number, private readonly intervalMs = 5000) { }

  start(): void {
    if (this.length <= 1 || prefersReducedMotion()) return;
    this.stop();
    this.timer = setInterval(() => this.index.update((i) => (i + 1) % this.length), this.intervalMs);
  }

  stop(): void {
    clearInterval(this.timer);
  }
}

interface HeroPhoto {
  src: string;
  position: string;
  desktopTransform?: string;
}

interface LinkItem {
  label: string;
  tag: string;
  tagSlug: string; // ascii-safe class suffix for `tag` (accented labels aren't safe as CSS class names)
  href: string | null; // null = not live yet
  rotate: number; // slight sticker-like tilt, degrees
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  constructor(private readonly host: ElementRef<HTMLElement>) { }

  protected readonly photos: HeroPhoto[] = [
    { src: '/assets/hero/1.jpg', position: '58% 80%' },
    { src: '/assets/hero/2.jpg', position: '10% 72%' },
    { src: '/assets/hero/3.jpg', position: '65% 62%', desktopTransform: 'translateX(-103px)' },
    { src: '/assets/hero/4.jpg', position: '40% 65%' },
    { src: '/assets/hero/5.jpg', position: '70% 87%' },
    { src: '/assets/hero/6.jpg', position: '50% 69%', desktopTransform: 'translateX(-300px)' },
    { src: '/assets/hero/7.jpg', position: '50% 85%', desktopTransform: 'translateX(-180px)' },
  ];

  protected readonly rotator = new PhotoRotator(this.photos.length);

  ngAfterViewInit(): void {
    this.rotator.start();
  }

  ngOnDestroy(): void {
    this.rotator.stop();
  }

  protected readonly name = 'Bruno León';
  protected readonly bio = 'Ingeniero de software aportando un granito de arena a la sociedad a través de la tecnología y el arte.';

  protected readonly links: LinkItem[] = [
    { label: 'Mi Metropolitano', tag: 'Proyecto', tagSlug: 'proyecto', href: 'https://oficinamentaldebruno.com/mi-metropolitano', rotate: -1.4 },
    { label: 'The Chords', tag: 'Proyecto', tagSlug: 'proyecto', href: 'https://oficinamentaldebruno.com/the-chords', rotate: 1.1 },
    { label: 'Live Sound Calculator', tag: 'Proyecto', tagSlug: 'proyecto', href: 'https://oficinamentaldebruno.com/live-sound-calculator', rotate: -0.8 },
    { label: 'Personal Trainer PWA', tag: 'Proyecto', tagSlug: 'proyecto', href: 'https://oficinamentaldebruno.com/personal-trainer-pwa', rotate: 1.3 },
    { label: 'Collage Tools', tag: 'Proyecto', tagSlug: 'proyecto', href: 'https://oficinamentaldebruno.com/collage-tools', rotate: -1.1 },
    { label: 'Artículos en dev.to', tag: 'Blog', tagSlug: 'blog', href: 'https://dev.to/gerardo_leon', rotate: 0.9 },
    { label: 'Instagram', tag: 'Social', tagSlug: 'social', href: 'https://www.instagram.com/oficinamentaldebruno', rotate: -1.3 },
    { label: 'TikTok', tag: 'Social', tagSlug: 'social', href: 'https://www.tiktok.com/@oficinamentaldebruno', rotate: 1.2 },
    { label: 'Poesía', tag: 'Poesía', tagSlug: 'poesia', href: 'https://thefaintestthing.blogspot.com/', rotate: -0.9 },
  ];
}
