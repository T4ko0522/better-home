"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * タブコンテキストの型定義
 */
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

/**
 * タブコンテナのプロパティ
 */
interface TabsProps {
  /** 現在選択されているタブの値 */
  value: string;
  /** タブの値が変更されたときに呼ばれるコールバック */
  onValueChange: (value: string) => void;
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * タブコンテナコンポーネント
 *
 * @param {TabsProps} props - タブのプロパティ
 * @returns {React.ReactElement} タブコンテナ
 */
function Tabs({ value, onValueChange, children, className }: TabsProps): React.ReactElement {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/**
 * タブリストのプロパティ
 */
interface TabsListProps {
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * タブリストコンポーネント
 *
 * @param {TabsListProps} props - タブリストのプロパティ
 * @returns {React.ReactElement} タブリスト
 */
function TabsList({ children, className }: TabsListProps): React.ReactElement {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-transparent p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * タブトリガーのプロパティ
 */
interface TabsTriggerProps {
  /** タブの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * タブトリガーコンポーネント
 *
 * @param {TabsTriggerProps} props - タブトリガーのプロパティ
 * @returns {React.ReactElement} タブトリガー
 */
function TabsTrigger({ value, children, className }: TabsTriggerProps): React.ReactElement {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs");
  }

  const isActive = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-background/50",
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * タブコンテンツのプロパティ
 */
interface TabsContentProps {
  /** タブの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * タブコンテンツコンポーネント
 *
 * @param {TabsContentProps} props - タブコンテンツのプロパティ
 * @returns {React.ReactElement | null} タブコンテンツ
 */
function TabsContent({ value, children, className }: TabsContentProps): React.ReactElement | null {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within Tabs");
  }

  if (context.value !== value) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

