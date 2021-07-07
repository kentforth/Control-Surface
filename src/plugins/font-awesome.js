import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt, faVk } from "@fortawesome/free-brands-svg-icons";
import {
  faCopy,
  faEnvelope,
  faFile,
  faVideo,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "@/libs/FontAwesomeIcon.vue";

library.add(fab, faGithubAlt, faVk);
library.add(fas, faCopy, faEnvelope, faFile, faVideo, faSave);

export { FontAwesomeIcon };
