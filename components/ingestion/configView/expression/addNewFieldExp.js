import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';

function AddNewFieldExp({ ingestionCss }) {
    const [fieldType, setFieldType] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [precision, setPrecision] = useState('');
    const [scale, setScale] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [description, setDescription] = useState('');

    const fieldTypeOptions = ['Type1', 'Type2', 'Type3'].map((e) => {
        return {
            value: e,
            label: e,
        }
    });

    const customCols = {
        labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
            md: { span: 5 },
            lg: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 19 },
            sm: { span: 19 },
            md: { span: 19 },
            lg: { span: 19 },
        },
    };

    const handleCancel = () => {
        // Add your cancel logic here
    };

    const handleSubmit = () => {
        // Add your submit logic here
    };

    return (
        <Form
            layout="horizontal"
            onFinish={handleSubmit}
        >
            <Row gutter={[6, 0]} justify="start">
                <Col span={24}>
                    <Form.Item label="Field Type:" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Select
                            style={{ borderRadius: "5px" }}
                            value={fieldType}
                            onChange={(value) => setFieldType(value)}
                            className={ingestionCss.inputSelect}
                            placeholder="Select Field Type"
                            options={fieldTypeOptions}
                        />
                    </Form.Item>
                    <Form.Item label="Name:" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={ingestionCss.input}
                            placeholder="Dev"
                        />
                    </Form.Item>
                    <Form.Item label="Type" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Select
                            style={{ borderRadius: "5px" }}
                            value={type}
                            onChange={(value) => setType(value)}
                            className={ingestionCss.inputSelect}
                            placeholder="Select Type"
                        // Add options for the 'Type' field
                        />
                    </Form.Item>
                    <Form.Item label="Precision" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Input
                            value={precision}
                            onChange={(e) => setPrecision(e.target.value)}
                            className={ingestionCss.input}
                            placeholder="100"
                        />
                    </Form.Item>
                    <Form.Item label="Scale:" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Input
                            value={scale}
                            onChange={(e) => setScale(e.target.value)}
                            className={ingestionCss.input}
                            placeholder="0"
                        />
                    </Form.Item>
                    <Form.Item label="Default Value:" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Input
                            value={defaultValue}
                            onChange={(e) => setDefaultValue(e.target.value)}
                            className={ingestionCss.input}
                            placeholder="ERROR('transformation error')"
                        />
                    </Form.Item>
                    <Form.Item label="Description:" labelAlign="left" {...customCols} className={ingestionCss.antFormItem}>
                        <Input.TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={ingestionCss.textArea}
                            placeholder="Enter Description"
                            rows={4}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row align={"end"}>
                <Col
                    className={ingestionCss.expBtnGrp}
                >
                    <Button
                        type="primary"
                        className={`${ingestionCss.expCancelBtn} ${ingestionCss.draftBtn}`}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        className={`${ingestionCss.expSubmitBtn} ${ingestionCss.saveBtn}`}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}


export default AddNewFieldExp