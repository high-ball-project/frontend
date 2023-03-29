import { As, ChakraComponent } from "@chakra-ui/react";
import { ComponentType } from "react";

export type DevfiveComponent<T = any> = ChakraComponent<As, T> & ComponentType;
