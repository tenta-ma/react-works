import { NotFound } from "pages/error/NotFound";
import React from "react";
import { FallbackProps } from "react-error-boundary";

/**
 * エラー発生時のフォールバックコンポーネント
 * エラー発生時がthrowされたら、ここでcatchしてエラー画面の表示を行う
 *
 * @param error 発生エラー
 * @returns エラー画面
 */
export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
}): JSX.Element => {
  // ここで拾えないエラーはいくつかある
  // 主に気にすることは「イベントハンドラのエラーは拾えない」「非同期コード」
  // * イベントハンドラのエラーは拾えない
  //   -> onClickのイベントでエラーを投げても拾えない
  //   -> useEffectのエラーなら拾える
  // @see https://ja.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries

  // XXX: error boundaryの配置箇所に関して
  // 内部でLinkを行うため、Routerより下部に配置する必要がある
  // しかしApp.tsxに配置してもうまく機能しなかったため各表示ページのrootに表示している
  // App.tsxで処理可能な場合、そのようにしてこのコメントは削除したい

  switch (error.constructor) {
    // FIXME: エラーの種類によってエラーページの表示切替を行う
    // 今(2022.03.28)はエラーページがnot foundしかないのでdefault not found
    default:
      return <NotFound />;
  }
};
