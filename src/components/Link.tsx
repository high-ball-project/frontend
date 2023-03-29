import { ThemeTypings, useToken } from "@chakra-ui/react";
import Text from "@components/Text";
import { Theme } from "@emotion/react";
import isNext from "@utils/isNext";
import TypoLink from "antd/es/typography/Link";
import * as nextRouter from "next/router";
import {
  ComponentType,
  CSSProperties,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import * as reactRouter from "react-router-dom";
import { HashLink, HashLinkProps } from "react-router-hash-link";

export type LinkProps = {
  to?: string | null | number;
  child?: ReactNode;
  children?: ReactNode;
  target?: "_self" | "_blank" | "_parent" | "_top" | string;
  replace?: boolean;
  full?: boolean;
  smooth?: boolean;
  preventScrollReset?: boolean;
  onClick?(): void;
  color?:
    | keyof Theme["colors"]
    | CSSProperties["color"]
    | ThemeTypings["colors"];
};

const InternalLink: ComponentType<LinkProps> = ({
  to,
  child,
  children,
  target,
  full,
  onClick,
  replace,
  color,
  smooth,
  preventScrollReset,
}: LinkProps) => {
  const router = isNext && nextRouter?.useRouter();
  const navigate = !isNext && reactRouter?.useNavigate();

  const handleClick = useCallback(
    async (event: MouseEvent) => {
      onClick?.();
      event.preventDefault();
      if (event.button === 2) return;
      if (target === "_blank" || event.button == 1) {
        if (typeof to === "number") window.history.go(to);
        else window.open(to!, "_blank");
        return;
      }
      if (router) {
        if (typeof to === "number") {
          if (to < 0) await router.back();
          else if (to > 0) await router.forward();
          return;
        }
        if (replace) await router.replace(to!);
        else await router.push(to!, undefined, { scroll: !smooth });
      } else if (navigate) {
        navigate(to! as reactRouter.To, {
          replace,
          preventScrollReset,
        });
      }
    },
    [onClick, target, router, navigate, to, replace, smooth, preventScrollReset]
  );

  if (
    typeof to === "string" &&
    router &&
    smooth &&
    (to as string).length &&
    (to as string)[0] === "#"
  )
    return (
      <HashLink
        smooth={smooth}
        style={{ width: full ? "100%" : "initial", color }}
        to={to as HashLinkProps["to"]}
      >
        {child || children}
      </HashLink>
    );

  return (
    <TypoLink
      onClick={handleClick}
      onMouseDown={handleClick}
      style={{ width: full ? "100%" : "initial", color }}
    >
      {child || children}
    </TypoLink>
  );
};

const Link: ComponentType<LinkProps> = (props: LinkProps) => {
  const color = useToken<string>("colors", props.color ?? "", props.color);

  return props.to === undefined || props.to === null ? (
    <Text onClick={props.onClick}>{props.child || props.children}</Text>
  ) : typeof props.to === "string" &&
    /[a-zA-Zㄱ-ㅎ가-힣]+/.test(props.to.substring(0, props.to.indexOf(":"))) ? (
    <TypoLink
      href={props.to}
      onClick={props.onClick}
      style={{
        width: props.full ? "100%" : "initial",
        color: color,
      }}
      target={props.target}
    >
      {props.child || props.children}
    </TypoLink>
  ) : (
    <InternalLink {...props} color={color} />
  );
};

export default Link;

// import { addPropertyControls, ControlType } from "framer";
//
// addPropertyControls(Link, {
//   to : {
//     type: ControlType.String,
//     defaultValue: "https://devfive.kr",
//   }
//   child: {
//     type: ControlType.
//   }
// });
