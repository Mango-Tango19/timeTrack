import React from "react";
import "react-calendar-timeline/lib/Timeline.css";

//https://github.com/namespace-ee/react-calendar-timeline/tree/master/examples

import Timeline, {
    TimelineHeaders,
    DateHeader
  }  from "react-calendar-timeline";

import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
  };
  

const groups = [
  { id: '1', title: "Абрамов Алексей Васильевич", stackItems: true,  rightTitle: 'title in the right sidebar' },
  { id: '2', title: "Аванесян Арсен Арменович", stackItems: true,  rightTitle: 'title in the right sidebar'  },
  { id: '3', title: "Белицкая Зинаида Сергеевна", stackItems: true,  rightTitle: 'title in the right sidebar'  },
  { id: '4', title: "Боровских Илья Юрьевич", stackItems: true,  rightTitle: 'title in the right sidebar'  },
];

// const calendarItems = [
//     {
//       id: 12,
//       group: 1,
//       title: "Отпуск",
//       start_time: 1662276194367,
//       end_time: 1664868194367,
//       canMove: false,
//       canResize: false,
//       canChangeGroup: false,
//     },
//     {
//         id: 13,
//         group: 2,
//         title: "Административный отпуск",
//         start_time: 1662276194367,
//         end_time: 1664868194367,
//         canMove: false,
//         canResize: false,
//         canChangeGroup: false,
//       }
// ]

const items = [
  {
    id: '1',
    group: '1',
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
    id:'2',
    group: '2',
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
    id: '3',
    group: '1',
    title: "Больничный",
    start_time: moment().add(1, "day"),
    end_time: moment().add(3, "day"),
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    className: "sick",
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const visibleTimeStart = moment().startOf('month').valueOf();
    const visibleTimeEnd   = moment().endOf('month').valueOf();

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd,
    };
  }

  onPrevClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart;
      return {
        visibleTimeStart: state.visibleTimeStart - zoom,
        visibleTimeEnd: state.visibleTimeEnd - zoom,
      };
    });
  };

  onNextClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart;
      console.log({
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom,
      });
      return {
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom,
      };
    });
  };
  handleItemSelect = (itemId, _, time) => {
    console.log("Selected: " + itemId, moment(time).format());
  };

  itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    debugger
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          },
          onMouseDown: () => {
            console.log("on item click", item);
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

      </div>
    );
  };
  
  render() {
    const { visibleTimeStart, visibleTimeEnd } = this.state;

    return (
      <div>
        <button onClick={this.onPrevClick}>{"< Prev"}</button>
        <button onClick={this.onNextClick}>{"Next >"}</button>
        <Timeline
          groups={groups}
          items={items}
          onItemSelect={this.handleItemSelect}
          canSelect
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          buffer={1}
          sidebarWidth={200}
        //   itemRenderer={this.itemRenderer}
        //   keys={keys}
        >
        <TimelineHeaders className="sticky">
        
          <DateHeader unit="primaryHeader" />
        
          <DateHeader />
        </TimelineHeaders>
        </Timeline>
      </div>
    );
  }
}
