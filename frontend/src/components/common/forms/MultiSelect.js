import Select from 'react-select';

const MultiSelect = ({
    field,
    form,
    options,
    isMulti = false,
    placeholder
}) => {
    function onChange(option) {
        form.setFieldValue(
            field.name,
            option ? (option).map((item) => item.value) : [],
        );
    }

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter((option) => field.value.indexOf(option.value) >= 0)
                : options.find((option) => option.value === field.value);
        } else {
            return isMulti ? [] : ('');
        }
    };
    if (!isMulti) {
        return (
            <Select
                options={options}
                name={field.name}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={(option) => form.setFieldValue(field.name, option.value)}
                onBlur={field.onBlur}
                placeholder={placeholder}
            />
        )
    } else {
        return (
            <Select
                value={getValue()}
                onChange={onChange}
                options={options}
                onBlur={field.onBlur}
                isMulti={true}
                placeholder={placeholder}
            />
        )
    }
}

// <Field name="atividades_id">
//       {({ field, form, meta }) => (
//                 <Select
//                   {...field}
//                   isMulti
//                   id="atividades_id"
//                   onChange={(values) => form.setFieldValue("atividades_id", values)} {/* Because formiks field.onChange` accepts an event, we need to manually bind this one as Select passes up the new values not nested in event */}
//                   getOptionValue={option => cities.value}
//                   options={cities}
//                   className="basic-multi-select"
//                   classNamePrefix="select"  
//                   />
//      )}
//  </Field>

export default MultiSelect;