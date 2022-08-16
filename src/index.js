import React from "react";
import { render } from "react-dom";
import CustomTimeline from "./CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";

import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

render(<CustomTimeline />, document.getElementById("root"));
