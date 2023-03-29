import {
  As,
  Box,
  chakra,
  ChakraComponent,
  Flex,
  ResponsiveValue,
  SpaceProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  MonthPickerProps,
  RangePickerProps,
  WeekPickerProps,
} from "antd/es/date-picker";
import {
  AutoComplete as _AutoComplete,
  AutoCompleteProps,
  Cascader as _Cascader,
  CascaderProps,
  Checkbox as _Checkbox,
  CheckboxProps,
  Col as _Col,
  ColProps,
  DatePicker as _DatePicker,
  DatePickerProps,
  Drawer as _Drawer,
  DrawerProps,
  Input as _Input,
  InputProps,
  Menu as _Menu,
  MenuProps,
  Radio as _Radio,
  RadioGroupProps,
  RadioProps,
  Row as _Row,
  RowProps,
  Select as _Select,
  Skeleton as _Skeleton,
  SkeletonProps,
  Spin as _Spin,
  SpinProps,
  Table as _Table,
  TableProps,
  Tabs as _Tabs,
  TabsProps,
  TimePickerProps,
  Tooltip as _Tooltip,
  TooltipProps,
  Tour as _Tour,
  TourProps,
  Upload as _Upload,
  UploadProps,
} from "antd/es/index";
import { PasswordProps, TextAreaProps } from "antd/es/input";
import { GroupProps } from "antd/es/input/Group";
import { SearchProps } from "antd/es/input/Search";
import { RadioButtonProps } from "antd/es/radio/radioButton";
import { ComponentProps, FC, InputHTMLAttributes, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

import { Footer, FooterProps } from "../";
import { MenuData } from "../interfaces/MenuData";
import { DevfiveComponent } from "../interfaces/types";
import { GNBProps } from "./GNB";
import GNB from "./GNB";
import { MiddleGNBProps } from "./MiddleGNB";
import MiddleGNB from "./MiddleGNB";
import { TopVisualProps } from "./TopVisual";
import TopVisual from "./TopVisual";

export const Br = chakra("br");

const __Col = chakra<As, ColProps>(_Col);

export const Col: ChakraComponent<
  As,
  Omit<
    ColProps,
    "span" | "offset" | "sm" | "lg" | "xl" | "xs" | "xxl" | "md"
  > & {
    span?: ResponsiveValue<number>;
    offset?: ResponsiveValue<number>;
  }
> = ({
  span = 24,
  offset = 0,
  ...rest
}: {
  span?: ResponsiveValue<number>;
} & Omit<ChakraComponent<As, ColProps>["propTypes"], "span">) => {
  const responsiveSpan = useBreakpointValue<number>(
    typeof span === "number"
      ? [span]
      : (span as Partial<Record<string, number>> | number[])
  );

  const responsiveOffset = useBreakpointValue<number>(
    typeof offset === "number"
      ? [offset]
      : (offset as Partial<Record<string, number>> | number[])
  );

  return <__Col {...rest} offset={responsiveOffset} span={responsiveSpan} />;
};

export const Row = chakra<As, RowProps>(_Row);

const OriginalInput = chakra<As, InputProps & InputHTMLAttributes<any>>(_Input);
const OriginalInputGroup = chakra<As, GroupProps>(_Input.Group);
const InputGroup = (props: ChakraComponent<As, GroupProps>["propTypes"]) => (
  <OriginalInputGroup
    compact
    style={{
      display: "flex",
    }}
    {...props}
  />
);

const InternalInput = OriginalInput as ChakraComponent<As, InputProps> & {
  Group: ChakraComponent<As, GroupProps>;
  Search: ChakraComponent<As, SearchProps>;
  TextArea: ChakraComponent<As, TextAreaProps>;
  Password: ChakraComponent<As, PasswordProps>;
};

InternalInput.Group = InputGroup;
InternalInput.Search = chakra(_Input.Search);
InternalInput.TextArea = chakra(_Input.TextArea);
InternalInput.Password = chakra(_Input.Password);

export const Input = InternalInput;

export const Option: FC<ComponentProps<typeof _Select.Option>> = _Select.Option;

export const Layout = chakra(
  ({
    title,
    footer,
    children,
    footerMt,
    topVisual,
    middleGNB,
    gnb,
    menu,
    ...rest
  }: {
    title?: string;
    children?: ReactNode | ReactNode[];
    footer?: FooterProps;
    gnb?: GNBProps;
    footerMt?: SpaceProps["mt"];
    topVisual?: TopVisualProps;
    middleGNB?: MiddleGNBProps;
    menu?: MenuData[];
  }) => (
    <>
      <Helmet title={title} />
      <Flex
        flexDir="column"
        mb={middleGNB && 10}
        position="relative"
        zIndex={100}
      >
        {gnb && <GNB {...gnb} menu={menu} />}
        {topVisual && <TopVisual {...topVisual} />}
        {middleGNB && <MiddleGNB {...middleGNB} menu={menu} />}
      </Flex>
      <Box {...rest}>{children}</Box>
      {footer && (
        <Box mt={footerMt}>
          <Footer {...footer} />
        </Box>
      )}
    </>
  ),
  {
    baseStyle: {
      backgroundColor: "background",
    },
  }
);

export const Container = chakra(Box, {
  baseStyle: {
    backgroundColor: "containerBackground",
    maxWidth: ["540px", "720px", "1140px"],
    px: 4,
    mx: "auto",
    minH: "80vh",
  },
});

export const Table = chakra<As, TableProps<any>>(_Table);

export const Menu = chakra<As, MenuProps>(_Menu);

export const Tour = chakra<As, TourProps>(_Tour);

const InternalRadio = chakra<As, RadioProps>(_Radio) as ChakraComponent<
  As,
  RadioProps
> & {
  Group: DevfiveComponent<RadioGroupProps>;
  Button: DevfiveComponent<RadioButtonProps>;
};

InternalRadio.Group = chakra(_Radio.Group);
InternalRadio.Button = chakra(_Radio.Button);

export const Radio = InternalRadio;

export const Checkbox = chakra<As, CheckboxProps>(_Checkbox);

export const Spin = chakra<As, SpinProps>(_Spin);

export const Upload = chakra<As, UploadProps>(_Upload);

export const AutoComplete = chakra<As, AutoCompleteProps>(_AutoComplete);

export const Cascader = chakra<As, CascaderProps<any>>(_Cascader);

const InternalDatePicker = chakra<As, DatePickerProps>(
  _DatePicker
) as ChakraComponent<As, DatePickerProps> & {
  RangePicker: DevfiveComponent<RangePickerProps>;
  MonthPicker: DevfiveComponent<MonthPickerProps>;
  QuarterPicker: DevfiveComponent<
    ComponentProps<typeof _DatePicker.QuarterPicker>
  >;
  TimePicker: DevfiveComponent<TimePickerProps>;
  YearPicker: DevfiveComponent<ComponentProps<typeof _DatePicker.YearPicker>>;
  WeekPicker: DevfiveComponent<WeekPickerProps>;
};

InternalDatePicker.RangePicker = chakra(_DatePicker.RangePicker);
InternalDatePicker.MonthPicker = chakra(_DatePicker.MonthPicker);
InternalDatePicker.QuarterPicker = chakra(_DatePicker.QuarterPicker);
InternalDatePicker.TimePicker = chakra(_DatePicker.TimePicker);
InternalDatePicker.YearPicker = chakra(_DatePicker.YearPicker);
InternalDatePicker.WeekPicker = chakra(_DatePicker.WeekPicker);

export const DatePicker = InternalDatePicker;

export const Drawer = chakra<As, DrawerProps>(_Drawer);

export const Tooltip = chakra<As, TooltipProps>(_Tooltip);

export const Skeleton = chakra<As, SkeletonProps>(_Skeleton);

export const Tabs = chakra<As, TabsProps>(_Tabs);
