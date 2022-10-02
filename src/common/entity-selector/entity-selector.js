import React, { useEffect } from 'react';
import { Select } from 'antd';

const defaultFilterOption = (input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const EntitySelector = ({
    options,
    multiple,
    selectAll,
    onChange,
    size,
    loading,
    placeholder,
    value,
    style,
    showSearch = true,
    disabled,
    filterOption = defaultFilterOption,
}) => {
    const allSelected = multiple && options?.length > 1 && value?.length === options?.length;

    if (selectAll)
        useEffect(() => {
            onChange(options.map((item) => item.value));
        }, [options]);

    return (
        <Select
            showSearch={showSearch}
            filterOption={filterOption}
            mode="multiple"
            size={size}
            showArrow
            value={value}
            options={options}
            loading={loading}
            placeholder={placeholder}
            onChange={onChange}
            notFoundContent={options.length ? 'Empty' : null}
            style={style}
            allowClear
            tagRender={allSelected ? () => null : undefined}
            maxTagPlaceholder={allSelected ? () => 'All Selected' : undefined}
            disabled={disabled}
        />
    );
};

export default EntitySelector;
