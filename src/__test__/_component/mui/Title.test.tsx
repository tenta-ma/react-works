import { fireEvent, render } from "@testing-library/react";
import { TextBox } from "main/_component/mui/TextBox";

describe("test for TextBox", () => {
  // 必須チェックのメッセージ
  const emptyErrorMessage: string = "値が設定されていません";

  describe("initialize", () => {
    // 初期状態ではsubmitはfalse
    const submitted: boolean = false;
    /**
     * 初期表示時(submit前)、コンポーネントに値がわたされた場合
     * inputに値に設定され,
     * エラーは表示されない
     */
    it("set default value", () => {
      const value: string = "value" + Math.random();
      const { getByTestId, queryByText } = render(
        <TextBox value={value} setValue={jest.fn()} isSubmit={submitted} />
      );
      const input: HTMLInputElement = getByTestId(
        "text-box"
      ) as HTMLInputElement;
      // 引数のパラメータが設定され、エラーは表示されない
      expect(input.value).toBe(value);
      expect(queryByText(emptyErrorMessage)).not.toBeInTheDocument();
    });
    /**
     * 初期表示時(submit前)、コンポーネントに空がわたされた場合
     * inputに値に設定されず、エラーは表示されない
     */
    it("set empty value", () => {
      const emptyValue: string = "";
      const { getByTestId, queryByText } = render(
        <TextBox value={emptyValue} setValue={jest.fn()} isSubmit={submitted} />
      );
      const input: HTMLInputElement = getByTestId(
        "text-box"
      ) as HTMLInputElement;
      // エラーは表示されない
      expect(input.value).toBe("");
      expect(queryByText(emptyErrorMessage)).not.toBeInTheDocument();
    });
  });

  describe("after onSubmit", () => {
    // onSubmitイベント後
    const submitted: boolean = true;
    /**
     * 必須チェック
     * submit後、値がある場合
     * valueに設定されエラーは表示されない
     */
    it("value set", () => {
      const value: string = "value" + Math.random();
      const { getByTestId, queryByText } = render(
        <TextBox value={value} setValue={jest.fn()} isSubmit={submitted} />
      );
      const input: HTMLInputElement = getByTestId(
        "text-box"
      ) as HTMLInputElement;
      // 引数のパラメータが設定され、エラーは表示されない
      expect(input.value).toBe(value);
      expect(queryByText(emptyErrorMessage)).not.toBeInTheDocument();
    });
    /**
     * 必須チェック
     * submit後、値がない場合
     * エラーが表示される
     */
    it("empty value", () => {
      const emptyValue: string = "";
      const { getByTestId, queryByText } = render(
        <TextBox value={emptyValue} setValue={jest.fn()} isSubmit={submitted} />
      );
      const input: HTMLInputElement = getByTestId(
        "text-box"
      ) as HTMLInputElement;
      // エラーが表示される
      expect(input.value).toBe("");
      expect(queryByText(emptyErrorMessage)).toBeInTheDocument();
    });
  });

  describe("onBlur", () => {
    /**
     * 値変更時にset state functionが呼ばれること
     */
    it("cahnge value", () => {
      const submitted: boolean = false;
      const value: string = "value";
      const setValue: jest.Mock = jest.fn();
      const { getByTestId } = render(
        <TextBox value={value} setValue={setValue} isSubmit={submitted} />
      );
      const input: HTMLInputElement = getByTestId(
        "text-box"
      ) as HTMLInputElement;

      // form 値の変更
      const afterValue: string = "title" + Math.random();
      // イベント発火
      fireEvent.blur(input, { target: { value: afterValue } });
      // setValueが変更後値で呼ばれる
      expect(setValue.mock.calls).toHaveLength(1);
      expect(setValue.mock.calls[0][0]).toBe(afterValue);
    });
  });
});
