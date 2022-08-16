import * as React from "react";
import { MonthTimeline } from "./MonthTimeline";
import * as moment from "moment/moment";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const names = ["Больничный", "Отпуск"];

const departments = [
  "Не выбрано",
  'ООО "НИК"',
  "ИКЦ «Жуковский»",
  "КБ ИКЦ",
  "Группа планирования и управления проектами",
];

function App() {
  const defaultGroups = [
    {
      id: "1",
      title: "Абрамов Алексей Васильевич",
      stackItems: true,
      rightTitle: "title in the right sidebar",
      department: 'ООО "НИК"',
    },
    {
      id: "2",
      title: "Аванесян Арсен Арменович",
      stackItems: true,
      rightTitle: "title in the right sidebar",
      department: "КБ ИКЦ",
    },
    {
      id: "3",
      title: "Белицкая Зинаида Сергеевна",
      stackItems: true,
      rightTitle: "title in the right sidebar",
      department: "ИКЦ «Жуковский»",
    },
    {
      id: "4",
      title: "Боровских Илья Юрьевич",
      stackItems: true,
      rightTitle: "title in the right sidebar",
      department: "Группа планирования и управления проектами",
    },
  ];

  const defaultItems = [
    {
      id: "1",
      group: "1",
      title: "Отпуск",
      start_time: moment(),
      end_time: moment().add(10, "day"),
      canMove: false,
      canResize: false,
      canChangeGroup: false,
      itemProps: {
        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />

        "aria-hidden": true,
        className: "weekend",
      },
    },
    {
      id: "2",
      group: "2",
      title: "План отпуска",
      start_time: moment().add(-5, "day"),
      end_time: moment().add(13, "day"),
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

    {
      id: "4",
      group: "3",
      title: "Декрет",
      start_time: moment().add(-10, "day"),
      end_time: moment().add(20, "day"),
      canMove: false,
      canResize: false,
      canChangeGroup: false,
      className: "Mothers",
    },
    {
      id: "5",
      group: "4",
      title: "Административный отпуск",
      start_time: moment().add(1, "day"),
      end_time: moment().add(9, "day"),
      canMove: false,
      canResize: false,
      canChangeGroup: false,
      className: "adm",
    },
  ];

  const [groups, setGroups] = React.useState(defaultGroups);
  const [items, setItems] = React.useState(defaultItems);

  const [department, setDepartment] = React.useState("");

  const handleSelect = (event) => {
    setDepartment(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [vacationType, setVacationType] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setVacationType(typeof value === "string" ? value.split(",") : value);
  };

  const handleResetFilters = () => {
    setVacationType([]);
    setGroups(defaultGroups);
  };

  const handleDepartment = () => {
    if (department === "Не выбрано") return defaultGroups;
    return groups.filter((item) => {
      return item.department === department;
    });
  };

  React.useEffect(() => {
    let mounted = true;
    if (department === "") return;
    if (mounted) {
      let arr = handleDepartment(department);
      setGroups(arr);
    }
    return () => (mounted = false);
  }, [department]);

  const handleVacationType = () => {
    let arr = defaultItems.filter((vacType) => {
      return vacationType.find((item) => item === vacType.title);
    });

    if (!arr.length) return [];
    const selectedGroupsNumbers = arr.map((item) => item.group);

    const filteredUsers = groups.filter((user) => {
      return selectedGroupsNumbers.find((item) => item === user.id);
    });

    return filteredUsers;
  };

  React.useEffect(() => {
    let mounted = true;
    if (vacationType.length === 0) return;
    if (mounted) {
      let arr = handleVacationType(vacationType);
      setGroups(arr);
    }
    return () => (mounted = false);
  }, [vacationType]);

  return (
    <div className='App'>
      <Grid
        container
        spacing={2}
        alignItems='center'
        sx={{ padding: "20px 10px" }}
      >
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id='select-label'>Подразделение</InputLabel>
            <Select
              labelId='select-label'
              id='select-label'
              value={department}
              label='Подразделение'
              onChange={handleSelect}
              fullWidth
            >
              {departments.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='multiple-checkbox-label'>
              Типы отсутствий
            </InputLabel>
            <Select
              sx={{ maxHeight: "56px" }}
              labelId='multiple-checkbox-label'
              id='multiple-checkbox-label'
              multiple
              value={vacationType}
              onChange={handleChange}
              MenuProps={MenuProps}
              input={
                <OutlinedInput id='multiple-checkbox-label' label='Chip' />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={vacationType.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          {vacationType.length > 0 ? (
            <Button variant='outlined' onClick={handleResetFilters}>
              Сбросить фильтры
            </Button>
          ) : null}
        </Grid>
      </Grid>

      <MonthTimeline groups={groups} items={items} />
    </div>
  );
}

export default App;
