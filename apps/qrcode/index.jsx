import React from 'react';
import { Form, Input, Select, NumberPicker } from '@alifd/next';

const qrcode = require('./qrcode-terminal/lib/main');

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default class QRCode extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: '',
      white: ' ',
      black: '▒',
      qrtext: '',
      type: 'text',
      startNum: 0,
    };
  }
  gen() {
    qrcode.generate(
      this.state.text,
      {
        black: this.state.black,
        white: this.state.white,
      },
      (qrtext) => {
        let result = qrtext;
        const num = parseInt(this.state.startNum);
        if (this.state.type === 'english') {
          result = result
            .split('\n')
            .map(
              (it, idx) =>
                `Create HUD Text(All Players(All Teams), Null, Custom String("${it}", Null, Null, Null), Null, Right, ${
                  idx + num
                }, Color(Purple), Color(Purple), Color(Purple), Visible To and String, Default Visibility);`,
            )
            .join('\n');
        }
        if (this.state.type === 'chinese') {
          result = result
            .split('\n')
            .map(
              (it, idx) =>
                `创建HUD文本(所有玩家(所有队伍), 无, 自定义字符串("${it}", 无, 无, 无), 无, 右, ${
                  idx + num
                }, 紫色, 紫色, 紫色, 可见和字符串, 默认可见度);`,
            )
            .join('\n');
        }
        this.setState({ qrtext: result });
      },
    );
  }
  handleChange(value, item) {
    this.setState(
      {
        ...this.state,
        [item.name]: item.value,
      },
      () => {
        this.gen();
      },
    );
  }
  handleFocus(e) {
    e.target.select();
  }
  render() {
    return (
      <Form {...formItemLayout} value={this.state} onChange={this.handleChange}>
        <FormItem label="二维码文本">
          <Input name="text" />
        </FormItem>
        <FormItem label="白色文本">
          <Input name="white" />
        </FormItem>
        <FormItem label="黑色文本">
          <Input name="black" />
        </FormItem>
        <FormItem label="起始序号">
          <NumberPicker name="startNum" type="inline" min={0} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label="生成类型">
          <Select name="type" style={{ width: '100%' }}>
            <Select.Option value="text">普通文本</Select.Option>
            <Select.Option value="chinese">中文代码</Select.Option>
            <Select.Option value="english">英文代码</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="生成结果">
          <Input.TextArea onFocus={this.handleFocus} readOnly rows={20} name="qrtext" />
        </FormItem>
      </Form>
    );
  }
}
