import { useEffect } from 'react';
import { WritingContent } from '../..';
import type { PageConfig } from '../../data/page-registry';
import photoOne from '@/assets/content/modernism-photography/phomo1.webp';
import photoTwo from '@/assets/content/modernism-photography/phomo2.webp';
import photoThree from '@/assets/content/modernism-photography/phomo3.webp';
import photoFour from '@/assets/content/modernism-photography/phomo4.webp';
import eggleston from '@/assets/content/modernism-photography/Eggleston.webp';
import { withContentPage } from '../../components/withContentPage';
import { imageDimensionsCache } from '@/shared/utils/imageDimensionsCache';

interface ModernismPhotographyPageProps {
  onNavigateToIndex: () => void;
  pageConfig: PageConfig;
}

function ModernismPhotographyContent(_: ModernismPhotographyPageProps) {
  // Preload critical images
  useEffect(() => {
    imageDimensionsCache.preloadImages([photoOne, photoTwo, photoThree, photoFour, eggleston]);
  }, []);
  return (
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
          { type: 'sectionHeader', title: 'Pictorialism' },
          {
            type: 'text',
            content:
              'Photography, like painting and other art forms, was transformed by modernism. Both arose from the same impulse to strip away ornamentation and reveal what’s essential. Painting pursued reduction, collapsing form into color, line, and gesture. Photography, by contrast, clung to depiction. Its radical take lay in insisting that the world itself was enough and that showing things plainly was the point. For most of the 20th century, clarity meant fidelity to what the lens could capture. But this wasn’t always the case.',
          },
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
            type: 'text',
            content:
              'Yet among these voices of affirmation, Garry Winogrand offered something unresolved. His photograph participated in the exhibition’s humanist overture, but its mood ran counter to consensus. Rather than inviting identification, Winogrand’s work occupied a cooler register, neutral and distant. As crowds moved through the staged utopia of Steichen’s galleries, his contribution lingered on the margins.',
          },
          {
            type: 'text',
            content:
              'In a paradox that feels almost inevitable, Winogrand’s method returned photography to terrain once explored by modern painting. Documentary long defined itself by its distance from painting, hunting for meaning in lived experience. Winogrand unsettled that divide. His camera drifted through the city with a curiosity not unlike Monet before a pond or a stack of hay. Monet painted to see how the world would look once it became paint; Winogrand, in his own register, tested how seeing itself changes when framed. “I take pictures to see what the world looks like photographed,” he said. But analogy only reaches so far. Photography is still not painting, and the camera is not a brush. Its logic remains stubbornly its own.',
          },
          {
            type: 'text',
            content:
              'John Szarkowski put it bluntly: “The basic material of photographs is not intrinsically beautiful…You’re not supposed to look at the thing, you’re supposed to look through it. It’s a window.”',
          },
          {
            type: 'text',
            content:
              'At MoMA, the baton passed from Steichen to Szarkowski, who, in his “New Documents” exhibition, granted center stage to Winogrand, Arbus, and Friedlander. The new documentary did not prove or soothe. The photograph no longer finished the world’s story; it insisted that we dwell in the fragment, the question, the misleading frame. Galleries ceased to be houses of consensus and became spaces of provisional impressions, loose ends, and open possibility. The promise of photography shifted from unity to inquiry, and from that point forward, the world inside the picture frame looked less familiar and far more unsettling.',
          },
          {
            type: 'text',
            content:
              'That spirit did not remain inside city limits. The lens expanded outward, following the grids and peripheries of the American landscape. Robert Adams emerged as an attentive witness to spaces some forgot to name. The subjects: tract houses, parking lots, utility poles, and water towers were recorded with plainness, relinquishing both drama and nostalgia. New Topographics gave this style a vocabulary. Its landscapes are measured and resolute, an accounting rather than an elegy, where the act of looking is scaled to the shape of things as they are. In Adams’s or the Bechers’s hands, the image does not complete an argument; it traces the contours of change, making space for recognition without demanding answers. ',
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
              'Photography, like painting and other art forms, was transformed by modernism. Both arose from the same impulse to strip away ornamentation and reveal what’s essential. Painting pursued reduction, collapsing form into color, line, and gesture. Photography, by contrast, clung to depiction. Its radical take lay in insisting that the world itself was enough and that showing things plainly was the point. For most of the 20th century, clarity meant fidelity to what the lens could capture. But this wasn’t always the case.',
          },
          {
            type: 'text',
            content:
              'Cameras designed to refract light onto a light-sensitive surface arrived in the 19th century as a new technology with a precarious claim to art. Critics dismissed photography as a tool of mere mechanical reproduction, while artists and photographers, without a framework to see it on its own terms, tried to map it onto the aesthetic ideals of painting. To assert its legitimacy, early photographers softened focus and manipulated composition, emphasizing an impressionist mood over mechanical fidelity. This gave rise to Pictorialism, a style championed by the Photo-Secession, which insisted that the camera could create, interpret, and move the viewer just as a brush could.',
          },
        ]}
    />
  );
}

export default withContentPage<ModernismPhotographyPageProps>(ModernismPhotographyContent);
