"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { TopNav, TopNavItem } from "@astryxdesign/core/TopNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandMark } from "@/components/BrandMark";

type AppFrameProps = {
  children: React.ReactNode;
  height?: "fill" | "auto";
  contentPadding?: 0 | 4 | 6 | 8 | 10;
};

export function AppFrame({
  children,
  height = "auto",
  contentPadding = 0,
}: AppFrameProps) {
  const pathname = usePathname();

  return (
    <AppShell
      height={height}
      contentPadding={contentPadding}
      variant="wash"
      topNav={
        <div className="site-header">
          <TopNav
            label="Tracker navigation"
            heading={<BrandMark />}
            centerContent={
              <>
                <TopNavItem
                  label="Flavors"
                  href="/"
                  isSelected={
                    pathname === "/" || pathname.startsWith("/flavors")
                  }
                />
                <TopNavItem
                  label="Map"
                  href="/map"
                  isSelected={pathname === "/map"}
                />
              </>
            }
          />
        </div>
      }
    >
      <div className={height === "fill" ? "frame-fill" : undefined}>
        <div className="frame-main">{children}</div>
        <SiteFooter />
      </div>
    </AppShell>
  );
}
