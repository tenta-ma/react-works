import { TextField } from "@mui/material";
import React from "react";

/**
 * MUIを利用したテキストボックス
 *
 * @param value テキストボックスの値(初期値)
 * @param setValue 値のset state
 * @param isSubmit submitの後の処理かどうか
 * @returns テキストボックス
 */
export const TextBox: React.VFC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isSubmit: boolean;
}> = ({ value, setValue, isSubmit }): JSX.Element => {
  // maxLengthの入力制限
  const valueMaxLength: number = 50;

  // エラー表示条件、submit処理後にメッセージが空の場合、メッセージを表示する
  const displayedErrorMessage = (): boolean => {
    return isSubmit && !value;
  };

  return (
    <TextField
      id="text-box"
      label={"(" + valueMaxLength + "文字以内)"}
      // 初期値
      defaultValue={value}
      // 非同期APIで値を取得してきて設定するなどで、先にコンポーネントの描画が走ってしまう場合
      // 1. (空の値で)コンポーネント描画->2. 非同期で取得したvalueを設定の時に
      // mui上のスクリプトでラベルをあれこれする処理が走らない。
      //
      // そのため、ラベルを値の有無で制御する
      // shirnk true:常に縮小 false:常に拡大 undefined:標準の動作(値があれば縮小、ない場合は標準の動作を設定)
      //
      // この時 {{ shrink: value }} とやると、値入力中にinputの中にラベルが残ったままになる
      // ただし、これはonBlurでstate設定させるようにしているため、{{ shrink: value || onFocus的な奴 }}とやれば解決する
      // ※undefined自体がonFocusイベント拾ってそうなので、実質同じようなものに見える
      InputLabelProps={{ shrink: value ? true : undefined }}
      // onchangeの場合、デフォ値が設定されている場合に
      // 値変更->Enterによるsubmitでstateの変更を拾えないため
      // onBlurでEnterのsubmitやoutFocusによる、state変更を発火
      onBlur={(e) => {
        // Enter submitによる規定以上のlengthを入れさせない制御
        // 入力制限を越える場合、送信値として設定させない
        setValue(e.target.value.slice(0, valueMaxLength));
      }}
      helperText={displayedErrorMessage() ? "値が設定されていません" : "　"}
      error={displayedErrorMessage()}
      // MUIは表示時に<div的な奴><input /></div的な奴>となるため
      // data-testidなど、input属性につけたいものはinputPropsに設定することで
      inputProps={{
        maxLength: valueMaxLength,
        name: "text-box",
        "data-testid": "text-box",
      }}
    />
  );
};
