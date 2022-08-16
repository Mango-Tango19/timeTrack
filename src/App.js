import React from "react";
import MonthTimeline from "./MonthTimeline";
import moment from "moment";

const groups = [
  {
    id: "1",
    title: "Абрамов Алексей Васильевич",
    stackItems: true,
    rightTitle: "title in the right sidebar",
  },
  {
    id: "2",
    title: "Аванесян Арсен Арменович",
    stackItems: true,
    rightTitle: "title in the right sidebar",
  },
  {
    id: "3",
    title: "Белицкая Зинаида Сергеевна",
    stackItems: true,
    rightTitle: "title in the right sidebar",
  },
  {
    id: "4",
    title: "Боровских Илья Юрьевич",
    stackItems: true,
    rightTitle: "title in the right sidebar",
  },
];

const items = [
  {
    id: "1",
    group: "1",
    title: "Отпуск",
    start_time: moment(),
    end_time: moment().add(6, "day"),
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend",
    },
  },
  {
    id: "2",
    group: "2",
    title: "План отпуска",
    start_time: moment().add(-0.5, "day"),
    end_time: moment().add(3, "day"),
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend_plan",
    },
  },
  {
    id: "3",
    group: "1",
    title: "Больничный",
    start_time: moment().add(1, "day"),
    end_time: moment().add(3, "day"),
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    className: "sick",
  },
];

const App = () => {
  return <MonthTimeline groups={groups} items={items} />;
};

export default App;
