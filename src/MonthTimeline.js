import React from "react";
import "react-calendar-timeline/lib/Timeline.css";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//https://github.com/namespace-ee/react-calendar-timeline/tree/master/examples

import Timeline, {
  TimelineHeaders,
  DateHeader,
  TodayMarker,
} from "react-calendar-timeline";

import "react-calendar-timeline/lib/Timeline.css";
import * as moment from "moment/moment";

// const keys = {
//     groupIdKey: "id",
//     groupTitleKey: "title",
//     groupRightTitleKey: "rightTitle",
//     itemIdKey: "id",
//     itemTitleKey: "title",
//     itemDivTitleKey: "title",
//     itemGroupKey: "group",
//     itemTimeStartKey: "start",
//     itemTimeEndKey: "end",
//     groupLabelKey: "title"
//   };

export class MonthTimeline extends React.Component {
  constructor(props) {
    super(props);
    const visibleTimeStart = moment().startOf("month").valueOf();
    const visibleTimeEnd = moment().endOf("month").valueOf();
    const tomorrow = moment().add("day").valueOf();

    this.state = {
      groups: [],
      items: [],
      visibleTimeStart,
      visibleTimeEnd,
      tomorrow,
    };
  }

  componentDidMount() {
    this.setState((state) => {
      return {
        ...state,
        groups: this.props.groups,
        items: this.props.items,
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(nextProps);
    }
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

      return {
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom,
      };
    });
  };
  // handleItemSelect = (itemId, _, time) => {
  //   console.log("Selected: " + itemId, moment(time).format());
  // };

  // itemRenderer = ({
  //   item,
  //   timelineContext,
  //   itemContext,
  //   getItemProps,
  //   getResizeProps,
  // }) => {
  //   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  //   const backgroundColor = itemContext.selected
  //     ? itemContext.dragging
  //       ? "red"
  //       : item.selectedBgColor
  //     : item.bgColor;
  //   const borderColor = itemContext.resizing ? "red" : item.color;
  //   return (
  //     <div
  //       {...getItemProps({
  //         style: {
  //           backgroundColor,
  //           color: item.color,
  //           borderColor,
  //           borderStyle: "solid",
  //           borderWidth: 1,
  //           borderRadius: 4,
  //           borderLeftWidth: itemContext.selected ? 3 : 1,
  //           borderRightWidth: itemContext.selected ? 3 : 1,
  //         },
  //         onMouseDown: () => {
  //           console.log("on item click", item);
  //         },
  //       })}
  //     >
  //       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

  //       <div
  //         style={{
  //           height: itemContext.dimensions.height,
  //           overflow: "hidden",
  //           paddingLeft: 3,
  //           textOverflow: "ellipsis",
  //           whiteSpace: "nowrap",
  //         }}
  //       >
  //         {itemContext.title}
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    const { visibleTimeStart, visibleTimeEnd, groups, items } = this.state;

    console.log(groups);

    return (
      <div>
        <div className='btn-next-prev_wrapper'>
          <Button
            variant='outlined'
            onClick={this.onPrevClick}
            endIcon={<ArrowBackIosIcon />}
          ></Button>

          <Button
            variant='outlined'
            onClick={this.onNextClick}
            endIcon={<ArrowForwardIosIcon />}
          ></Button>
        </div>
        <Timeline
          groups={groups}
          items={items}
          onItemSelect={this.handleItemSelect}
          canSelect
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          buffer={1}
          sidebarWidth={200}
          itemTouchSendsClick={true}
          //   itemRenderer={this.itemRenderer}
          //   keys={keys}
        >
          <TimelineHeaders className='sticky'>
            <DateHeader unit='primaryHeader' />
            <DateHeader className='date_line' />

            {/* <CustomMarker date={today} /> */}
          </TimelineHeaders>
          <TodayMarker />
        </Timeline>
      </div>
    );
  }
}
