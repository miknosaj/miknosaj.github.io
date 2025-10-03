import { useEffect, useRef, useState } from 'react';
import { WritingContent } from '../..';
import type { PageConfig } from '../../data/page-registry';
import photoOne from '@/assets/content/modernism-photography/phomo1.webp';
import photoTwo from '@/assets/content/modernism-photography/phomo2.webp';
import photoThree from '@/assets/content/modernism-photography/phomo3.webp';
import photoFour from '@/assets/content/modernism-photography/phomo4.webp';
import eggleston from '@/assets/content/modernism-photography/Eggleston.webp';
import winograndFamilyOfMan from '@/assets/content/modernism-photography/family-of-man_winogrand.webp';
import winograndFamilyOfManFull from '@/assets/content/modernism-photography/family-of-man_winogrand-full.webp';
import nanBw from '@/assets/content/modernism-photography/nan-bw.webp';
import nanColor from '@/assets/content/modernism-photography/nan-color.webp';
import bh1 from '@/assets/content/modernism-photography/bh-photos/bh1.png';
import bh2 from '@/assets/content/modernism-photography/bh-photos/bh2.png';
import bh3 from '@/assets/content/modernism-photography/bh-photos/bh3.png';
import bh4 from '@/assets/content/modernism-photography/bh-photos/bh4.png';
import bh5 from '@/assets/content/modernism-photography/bh-photos/bh5.png';
import bh6 from '@/assets/content/modernism-photography/bh-photos/bh6.png';
import bh7 from '@/assets/content/modernism-photography/bh-photos/bh7.png';
import bh8 from '@/assets/content/modernism-photography/bh-photos/bh8.png';
import bh9 from '@/assets/content/modernism-photography/bh-photos/bh9.png';
import bh10 from '@/assets/content/modernism-photography/bh-photos/bh10.png';
import bh11 from '@/assets/content/modernism-photography/bh-photos/bh11.png';
import bh12 from '@/assets/content/modernism-photography/bh-photos/bh12.png';
import bh13 from '@/assets/content/modernism-photography/bh-photos/bh13.png';
import bh14 from '@/assets/content/modernism-photography/bh-photos/bh14.png';
import bh16 from '@/assets/content/modernism-photography/bh-photos/bh16.png';
import { withContentPage } from '../../components/withContentPage';
import { imageDimensionsCache } from '@/shared/utils/imageDimensionsCache';
import { LightSwitch } from '@/shared/ui/media/LightSwitch';
import type { StackImage } from '@/shared/ui/media/InlineImageStack';
import { InlineImageSpreadStack } from '@/shared/ui/media/InlineImageSpreadStack';

const becherArchiveImages: StackImage[] = [
  { src: bh1, alt: 'Becher contact sheet archive, folder 1' },
  { src: bh2, alt: 'Becher contact sheet archive, folder 2' },
  { src: bh3, alt: 'Becher contact sheet archive, folder 3' },
  { src: bh4, alt: 'Becher contact sheet archive, folder 4' },
  { src: bh5, alt: 'Becher contact sheet archive, folder 5' },
  { src: bh6, alt: 'Becher contact sheet archive, folder 6' },
  { src: bh7, alt: 'Becher contact sheet archive, folder 7' },
  { src: bh8, alt: 'Becher contact sheet archive, folder 8' },
  { src: bh9, alt: 'Becher contact sheet archive, folder 9' },
  { src: bh10, alt: 'Becher contact sheet archive, folder 10' },
  { src: bh11, alt: 'Becher contact sheet archive, folder 11' },
  { src: bh12, alt: 'Becher contact sheet archive, folder 12' },
  { src: bh13, alt: 'Becher contact sheet archive, folder 13' },
  { src: bh14, alt: 'Becher contact sheet archive, folder 14' },
  { src: bh16, alt: 'Becher contact sheet archive, folder 15' },
];

interface ModernismPhotographyPageProps {
  onNavigateToIndex: () => void;
  pageConfig: PageConfig;
}

function ModernismPhotographyContent(_: ModernismPhotographyPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeWrapperRef = useRef<HTMLDivElement | null>(null);
  const metaRefs = useRef<{
    theme?: HTMLMetaElement;
    status?: HTMLMetaElement;
    fallbackTheme?: { element: HTMLMetaElement; original: string | null };
    fallbackStatus?: { element: HTMLMetaElement; original: string | null };
  }>({});

  // Preload critical images
  useEffect(() => {
    imageDimensionsCache.preloadImages([
      photoOne,
      photoTwo,
      photoThree,
      photoFour,
      eggleston,
      winograndFamilyOfMan,
      winograndFamilyOfManFull,
      nanBw,
      nanColor,
      ...becherArchiveImages.map((image) => image.src),
    ]);
  }, []);

  useEffect(() => {
    const container = themeWrapperRef.current?.closest('.content-page-container');
    if (!container) {
      return;
    }

    container.classList.toggle('modernism-dark', isDarkMode);

    // Apply dark class to html element to update CSS variables at root
    document.documentElement.classList.toggle('dark', isDarkMode);

    return () => {
      container.classList.remove('modernism-dark');
      document.documentElement.classList.remove('dark');
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const ensureMeta = (id: string, attributes: Record<string, string>) => {
      let metaEl = document.head.querySelector<HTMLMetaElement>(`#${id}`);
      let created = false;

      if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.id = id;
        document.head.appendChild(metaEl);
        created = true;
      }

      Object.entries(attributes).forEach(([attr, value]) => {
        metaEl?.setAttribute(attr, value);
      });

      return { element: metaEl, created };
    };

    const themeResult = ensureMeta('modernism-theme-color', { name: 'theme-color' });
    const statusResult = ensureMeta('modernism-status-style', {
      name: 'apple-mobile-web-app-status-bar-style',
    });

    const fallbackThemeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
    const fallbackStatusMeta = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-status-bar-style"]');

    metaRefs.current.fallbackTheme = fallbackThemeMeta
      ? { element: fallbackThemeMeta, original: fallbackThemeMeta.getAttribute('content') }
      : undefined;
    metaRefs.current.fallbackStatus = fallbackStatusMeta
      ? { element: fallbackStatusMeta, original: fallbackStatusMeta.getAttribute('content') }
      : undefined;

    metaRefs.current.theme = themeResult.element ?? undefined;
    metaRefs.current.status = statusResult.element ?? undefined;

    return () => {
      if (themeResult.created && themeResult.element) {
        themeResult.element.remove();
      }
      if (statusResult.created && statusResult.element) {
        statusResult.element.remove();
      }
      if (metaRefs.current.fallbackTheme) {
        const { element, original } = metaRefs.current.fallbackTheme;
        if (element) {
          if (original !== null) {
            element.setAttribute('content', original);
          } else {
            element.removeAttribute('content');
          }
        }
      }
      if (metaRefs.current.fallbackStatus) {
        const { element, original } = metaRefs.current.fallbackStatus;
        if (element) {
          if (original !== null) {
            element.setAttribute('content', original);
          } else {
            element.removeAttribute('content');
          }
        }
      }
    };
  }, []);

  useEffect(() => {
    const themeColor = isDarkMode ? '#000000' : '#ffffff';
    const statusStyle = isDarkMode ? 'black-translucent' : 'default';

    if (metaRefs.current.theme) {
      metaRefs.current.theme.setAttribute('content', themeColor);
    }
    if (metaRefs.current.status) {
      metaRefs.current.status.setAttribute('content', statusStyle);
    }
    if (metaRefs.current.fallbackTheme?.element) {
      metaRefs.current.fallbackTheme.element.setAttribute('content', themeColor);
    }
    if (metaRefs.current.fallbackStatus?.element) {
      metaRefs.current.fallbackStatus.element.setAttribute('content', statusStyle);
    }
  }, [isDarkMode]);

  return (
    <>
      <div
        style={{
          transition: 'background-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100lvh',
          zIndex: -1,
        }}
      />
      <div ref={themeWrapperRef} className={isDarkMode ? 'dark' : ''}>
      <WritingContent
        blocks={[
          {
            type: 'text',
            content:
              'Hey! What are you doing here? This is a work in progress that I\'m still crafting. Come back soon!',
          },
          {
            type: 'text',
            content:
              '--',
          },
          {
            type: 'text',
            content:
              'Long before I even considered design as a career, before I even knew it could be a career, I was drawn to photography. Compared to what I saw with my own eyes, a two-dimensional image seemed to hold uncanny power over my emotions. But fascination quickly gave way to confusion. The photos I thought were beautiful weren\'t the ones in the books I found: William Eggleston\'s Guide, The Ballad of Sexual Dependency, Pictures from Home. These didn\'t look beautiful at all. Still, I wasn\'t naïve enough to dismiss them outright. If the most respected art institutions in the world celebrated these works, then there was something I wasn\'t yet seeing.',
          },
          {
            type: 'imageNoBorder',
            image: {
              src: eggleston,
              alt: 'William Eggleston photograph',
              caption: 'William Eggleston\'s Guide, 1976',
            },
          },
          {
            type: 'text',
            content:
              'Over a decade of training my eye and taking photos as a stubborn hobbyist has taught me to recognize their merit and power, and I regret not seeing it sooner. I am not formally trained, nor is this going to be a comprehensive history. But my wish, if you\'ll read on, is to share just how extraordinary photography can be. And if you too have ever felt confused by what you see in museums and books, as I once was, I hope you\'ll come to see it again with a renewed perspective.',
          },
          {
            type: 'text',
            content:
              'Photography, like painting and other art forms, was transformed by modernism. Both arose from the same impulse to strip away ornamentation and reveal what’s essential. Painting pursued reduction, collapsing form into color, line, and gesture. Photography, by contrast, clung to depiction. Its radical take lay in insisting that the world itself was enough and that showing things plainly was the point. For most of the 20th century, clarity meant fidelity to what the lens could capture. But this wasn’t always the case.',
          },
          { type: 'sectionHeader', title: 'Pictorialism' },
          {
            type: 'text',
            content:
              'Cameras designed to refract light onto a light-sensitive surface arrived in the 19th century as a new technology with a precarious claim to art. Critics dismissed photography as a tool of mere mechanical reproduction, while artists and photographers, without a framework to see it on its own terms, tried to map it onto the aesthetic ideals of painting. To assert its legitimacy, early photographers softened focus and manipulated composition, emphasizing an impressionist mood over mechanical fidelity. This gave rise to Pictorialism, a style championed by the Photo-Secession, which insisted that the camera could create, interpret, and move the viewer just as a brush could.',
          },
          {
            type: 'imageStack',
            stack: [
              { src: photoOne, alt: 'Modernist portrait, trio of women', caption: 'Portrait study (ca. 1915)' },
              { src: photoTwo, alt: 'Shadow play across a facade', caption: 'Shadow and Facade' },
              { src: photoThree, alt: 'Industrial landscape perspective', caption: 'Industrial rhythm' },
              { src: photoFour, alt: 'Detail in afternoon light', caption: 'Modernist detail' },
            ],
            height: 340,
            mobileHeight: 255,
          },
          {
            type: 'quote',
            quote: 'Atmosphere softens all lines; it graduates the transition from light to shade; it is essential to the reproduction of the sense of distance. That dimness of outline which is characteristic for distant objects is due to atmosphere. Now, what atmosphere is to Nature, tone is to a picture.',
            cite: 'Alfred Stieglitz (who later ditched pictorialism)',
          },
          {
            type: 'text',
            content:
              'That isn’t to say Pictorialism lacked merit in its own right. Its sensibilities of compsition, mood, and open expressive intent conveyed a sincerity that felt almost absent in the later shift toward modernist clarity. We also have to credit Pictorialists for insisting that photography is not a neutral record but a manipulation of reality in service of a creative agenda, a conversation that would only gather real momentum a few decades later.',
          },
          {
            type: 'text',
            content:
              '...Need to finish writing the rest of the post...',
          },
          { type: 'sectionHeader', title: 'Straight and Formal' },
          {
            type: 'text',
            content:
              'By the 1920s, photography shook off its painterly hangover and embraced an aethetic ideal that only a camera could achieve. Paul Strand and Edward Weston announced that the camera was not a poor man’s paintbrush but a machine of revelation. Weston’s peppers, Strand’s fences, the crisp shadows of Group f/64: these were manifestos in silver gelatin. The world, they said, was not raw material for imitation but already a composition, if only you looked hard enough.',
          },
          {
            type: 'text',
            content:
              'This was the first modernist wager: clarity and tonality as virtue, precision as liberation. But there was a cost to all that purity. In its hunt for formal perfection, straight photography often evacuated the mess and contingency of life. The world may have been enough, but it was a world scrubbed of conflict, of pain, and of politics.',
          },
          { type: 'sectionHeader', title: 'The New Deal\'s Social Urgency' },
          {
            type: 'text',
            content:
              'The Great Depression and the Dust Bowl cast a haze over the polished landscapes of the 1920s. Farms failed, towns hollowed, and families were uprooted, carrying their lives and hopes across a country in crisis. Against that backdrop, the U.S. government, astonishingly, became photography’s greatest patron. The Farm Security Administration hired Walker Evans, Dorothea Lange, and others to document the human and environmental toll of the era. Modernist precision met its moral match.',
          },
          {
            type: 'text',
            content:
              'Evans photographed shotgun houses, church facades, and roadside signage with the same rigor Weston brought to shells and dunes. Each frame rendered vernacular architecture monumental, transforming the everyday into evidence of a nation under pressure. Lange turned her lens to the people inhabiting these spaces. Their faces lined with hunger, wind, and quiet resilience demanded acknowledgment. Migrant Mother carries the compositional care of a Weston nude and the weight of lived experience. It refuses distance and refuses comfort.',
          },
          {
            type: 'text',
            content:
              'The Dust Bowl stretched across the plains, coating everything in a fine, gray grit. The land itself was implicated in the crisis. The storms became a visual and psychic backdrop for the human suffering Evans and Lange captured. Their work did more than record. It made the urgency tangible and made viewers feel alongside those enduring it.',
          },
          {
            type: 'text',
            content:
              'Straight photography had found its conscience. It had learned that form alone could not carry meaning. It needed the grit, the dust, and the faces of those it portrayed.',
          },
          { type: 'sectionHeader', title: 'The Family of Man and Magnum’s Human Condition' },
          {
            type: 'text',
            content:
              'While Evans and Lange answered the government’s call to document a nation in crisis, Henri Cartier-Bresson made his own call. He studied the FSA images and treated their stark, uncompromising, moral charge as a provocation. He rejected photographers who hid behind formal perfection. With a characteristic jab, he remarked that Weston and Ansel Adams were “photographing rocks while the world was going to pieces.” It was a joke that inadvertently clarified his manifesto: photography must engage with the reality of human life.',
          },
          {
            type: 'text',
            content:
              'For Cartier-Bresson, the task was to capture the human condition with discipline and grace. Composition was not a frivolous ornament but an ethical tool. A way of applying dignity through precision. He refused to crop his photographs; the image had to be made whole in the instant of exposure. In that fleeting interval he named “the decisive moment,” gesture, structure, and setting fused into something at once intelligible and dignified. If the FSA cataloged hardship, Cartier-Bresson shaped a philosophy of vision, framing, and respect for the universal experience of mankind.',
          },
          {
            type: 'text',
            content:
              'That philosophy expanded through Magnum Photos, which he co-founded with Robert Capa in 1947. Capa brought immediacy and witness; Cartier-Bresson brought restraint and elegance. Together, they established a collective that empowered photographers to choose their own subjects, to follow stories they deemed vital. The principle was disarmingly clear: photography is a moral act, carried out through an aesthetic lens.',
          },
          {
            type: 'text',
            content:
              'This ethos found its most ambitious and public stage in the 1955 exhibition The Family of Man, organized by Edward Steichen in his influential role as Director of MoMA’s Department of Photography. Drawing on Magnum’s global network, Steichen assembled 503 photographs by 273 photographers from 68 countries. An effort to create a sweeping visual testament to universal human experiences: birth, love, labor, conflict, and peace. Steichen’s curatorial vision was deeply globalist, presenting humanity as a single, interconnected family whose joys and struggles transcended national and social boundaries.',
          },
          {
            type: 'text',
            content:
              'The Family of Man was explicitly framed as a postwar statement of hope and unity; its touring installations around the world, seen by more than nine million people, became a kind of artistic diplomacy aimed at fostering empathy, cross-cultural understanding, and the vision of a world knit together by shared values. Steichen believed that MoMA, through photography, had the potential to counteract Cold War divisions and reaffirm faith in fundamental human rights and the dignity of all people. While some critics claimed the exhibition’s universalism was naive and glossed over real-world injustices, its influence was profound: The Family of Man crystallized the moral and global ambitions of Cartier-Bresson, Magnum, and Steichen himself, showing how photography could make the personal resonate at the scale of the world.',
          },
          { type: 'sectionHeader', title: 'New Documents and Topographics' },
          {
            type: 'text',
            content:
              'The Family of Man assembled its vast chorus, promising photography as a vessel for recognition, healing, and modern unity. Edward Steichen sought binding agents: images that would cradle the viewer in shared experience, translating universal pain or joy into a universal lesson.',
          },
          {
            type: 'imageWithMagnifier',
            image: {
              src: winograndFamilyOfMan,
              alt: 'Garry Winogrand photograph from The Family of Man exhibition',
              caption: 'Garry Winogrand, from The Family of Man, 1955',
              magnifierSrc: winograndFamilyOfManFull,
            },
          },
          {
            type: 'text',
            content:
              'Yet among these voices of affirmation, Garry Winogrand offered something unresolved. His photograph participated in the exhibition’s humanist overture, but its mood ran counter to consensus. Rather than inviting identification, Winogrand’s work occupied a cooler register, neutral and distant. As crowds moved through the staged utopia of Steichen’s galleries, his contribution lingered on the margins.',
          },
          {
            type: 'text',
            content:
              'In a paradox that feels almost inevitable, Winogrand’s method returned photography to terrain once explored by modern painting. Documentary long defined itself by its distance from painting, hunting for meaning in lived experience. Winogrand unsettled that divide. His camera drifted through the city with a curiosity not unlike Monet before a pond or a stack of hay. Monet painted to see how the world would look once it became paint; Winogrand, in his own register, tested how seeing itself changes when framed.',
          },
          {
            type: 'quote',
            quote: 'I take pictures to see what the world looks like photographed.',
            cite: 'Garry Winogrand',
          },
          {
            type: 'text',
            content:
              'But the analogy ends there. John Szarkowski put it bluntly: “The basic material of photographs is not intrinsically beautiful…You’re not supposed to look at the thing, you’re supposed to look through it. It’s a window.”',
          },
          {
            type: 'text',
            content:
              'At MoMA, the baton passed from Steichen to Szarkowski, who, in his “New Documents” exhibition, granted center stage to Winogrand, Arbus, and Friedlander. The new documentary did not prove or soothe. The photograph no longer finished the world’s story; it insisted that we dwell in the fragment, the question, the misleading frame. Galleries ceased to be houses of consensus and became spaces of provisional impressions, loose ends, and open possibility. The promise of photography shifted from unity to inquiry, and from that point forward, the world inside the picture frame looked less familiar and far more unsettling.',
          },
          {
            type: 'imageSpreadStack',
            images: becherArchiveImages,
            caption: 'Bernd and Hilla Becher archive contact sheets',
            rows: 3,
            cols: 5,
          },
          {
            type: 'text',
            content:
              'That spirit did not remain inside city limits. The lens expanded outward, following the grids and peripheries of the American landscape. Robert Adams, Bernd and Hilla Becher, and others emerged as an attentive witnesses to spaces some forgot to name. The subjects: tract houses, parking lots, utility poles, and water towers were recorded with plainness, relinquishing both drama and nostalgia. New Topographics gave this style a vocabulary. Its landscapes are measured and resolute, an accounting rather than an elegy, where the act of looking is scaled to the shape of things as they are. In the hands of these new *topographers*, the image does not complete an argument; it traces the contours of change, making space for recognition without demanding answers. ',
          },
        ]}
        />

        <WritingContent
          blocks={[
            { type: 'sectionHeader', title: 'A New Spectrum' },
            {
              type: 'text',
              content:
                `Color, for so long, was photography's errant child. Fit for selling cars and canned soup, never for the elevation of art. Black-and-white, with its aura of craft and concentration, remained the standard-bearer: the hush of the darkroom, hands stained with fixer, abstraction shielding the image from the garishness of reality. The nude body, rendered in monochrome, could be contemplated; rendered in color, it was pornography.`,
            },
            {
              type: 'text',
              content:
                `But then came artists who shattered this hierarchy by making color their own. William Eggleston insisted that the everyday could be profound by color alone. His radical approach was a reimagining of what could be seen as art, treating the ordinary world with grave attention and heightened perception. His vision was to propose that color's very ordinariness and democratic excess could be photography's foundation rather than its undoing.`,
            },
            {
              type: 'text',
              content:
                `Soon after, Nan Goldin took that foundation and transformed it into autobiography. Where Eggleston lingered on the muted glow of the American suburb, Goldin immersed her lens in the raw tones of intimacy: flesh, glitter, bruises, desire. For her, color was visceral and immersive. It was the language of confession, making visible what black-and-white could only disguise. A black eye, after all, is not black but blue, violet, brown, and yellow. And Goldin's drag queens, unlike Arbus's transvestites observed at a distance, appeared simply as friends sitting in the back seat.`,
            },
          ]}
        />

        <figure className="relative my-12 inline-image-container w-full md:w-[115%] md:-ml-[7.5%]">
          <div
            className="relative w-full"
            style={{
              boxShadow: isDarkMode
                ? '0px 2px 8px 0px rgba(255, 255, 255, 0.15)'
                : '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
              transition: 'box-shadow 900ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src={nanBw}
              alt="Nan Goldin photograph"
              className="w-full h-auto object-cover bg-[#f5f5f5]"
              style={{
                opacity: isDarkMode ? 0 : 1,
                transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)',
                objectPosition: 'center',
              }}
              loading="lazy"
              decoding="async"
            />
            <img
              src={nanColor}
              alt="Nan Goldin photograph"
              className="absolute top-0 left-0 w-full h-auto object-cover bg-[#f5f5f5]"
              style={{
                opacity: isDarkMode ? 1 : 0,
                transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)',
                objectPosition: 'center',
              }}
              loading="lazy"
              decoding="async"
            />
            {/* White border frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute border-[8px] border-solid inset-[-8px]"
              style={{
                borderColor: '#fff',
                boxShadow: isDarkMode
                  ? '0px 2px 8px 0px rgba(255, 255, 255, 0.15)'
                  : '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
                transition: 'box-shadow 900ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
          <figcaption className="mt-6 text-sm text-[#9c9c9b] leading-relaxed text-center">
            Nan Goldin, "Nan and Brian in Bed, New York City," 1983
          </figcaption>

          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-[calc(100%+2rem)]">
            <LightSwitch isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </figure>

        <div className="mt-4 mb-8 flex justify-center md:hidden">
          <LightSwitch isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
        </div>

        <WritingContent
          blocks={[
            {
              type: 'text',
              content:
                `Together with other contemporaries, these photographers dismantled the suspicion that color was frivolous or corrupting. They proved it could bear the weight of emotion and truth as forcefully as any monochrome. If black-and-white suggested contemplation through abstraction, color now offered confrontation of the real, the present, and the overwhelming intensity of looking at life without a filter.`,
            },
            { type: 'sectionHeader', title: 'The New Magnum: Parr for the course' },
            { type: 'sectionHeader', title: 'The New New Documents' },
            {
              type: 'imageStack',
              stack: [
                { src: photoOne, alt: 'Modernist portrait, trio of women', caption: 'Portrait study (ca. 1915)' },
                { src: photoTwo, alt: 'Shadow play across a facade', caption: 'Shadow and Facade' },
                { src: photoThree, alt: 'Industrial landscape perspective', caption: 'Industrial rhythm' },
                { src: photoFour, alt: 'Detail in afternoon light', caption: 'Modernist detail' },
              ],
              height: 340,
              mobileHeight: 255,
            },
            {
              type: 'quote',
              quote: 'I take pictures to see what the world looks like photographed.',
              cite: 'Garry Winogrand',
            },
            {
              type: 'text',
              content:
                `Photography, like painting and other art forms, was transformed by modernism. Both arose from the same impulse to strip away ornamentation and reveal what's essential. Painting pursued reduction, collapsing form into color, line, and gesture. Photography, by contrast, clung to depiction. Its radical take lay in insisting that the world itself was enough and that showing things plainly was the point. For most of the 20th century, clarity meant fidelity to what the lens could capture. But this wasn't always the case.`,
            },
            {
              type: 'text',
              content:
                'Cameras designed to refract light onto a light-sensitive surface arrived in the 19th century as a new technology with a precarious claim to art. Critics dismissed photography as a tool of mere mechanical reproduction, while artists and photographers, without a framework to see it on its own terms, tried to map it onto the aesthetic ideals of painting. To assert its legitimacy, early photographers softened focus and manipulated composition, emphasizing an impressionist mood over mechanical fidelity. This gave rise to Pictorialism, a style championed by the Photo-Secession, which insisted that the camera could create, interpret, and move the viewer just as a brush could.',
            },
          ]}
        />

        <div className="mt-16 mb-12 flex flex-col items-center gap-4">
          <LightSwitch isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          <p
            className="text-sm text-[#9c9c9b] leading-relaxed text-center"
            style={{
              opacity: isDarkMode ? 1 : 0,
              transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            You can turn the light back on now!
          </p>
        </div>
      </div>
    </>
  );
}

export default withContentPage<ModernismPhotographyPageProps>(ModernismPhotographyContent);
