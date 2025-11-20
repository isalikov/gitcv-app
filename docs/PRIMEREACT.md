# PrimeReact UI Library

This document describes how to use PrimeReact in the application.

## Overview

The application uses [PrimeReact](https://primereact.org/) as the UI component library. PrimeReact provides:

- **Rich component set** - Over 90 components including forms, data tables, charts, and more
- **Responsive design** - Mobile-first components that work on all screen sizes
- **Theme support** - Multiple pre-built themes and easy customization
- **TypeScript support** - Full type definitions included
- **Accessibility** - WCAG compliant components

## Installation

PrimeReact is already installed in the project:

```bash
pnpm add primereact primeicons
```

## Configuration

Styles are imported globally in `src/main.tsx`:

```typescript
// PrimeReact styles
// Core CSS
import 'primeicons/primeicons.css';
// Theme
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

// Icons
```

### Available Themes

PrimeReact comes with multiple themes. To change the theme, update the import in `main.tsx`:

```typescript
// Light themes
// Dark themes
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
// Default
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
```

## Usage Examples

### Button Component

```typescript
import { Button } from 'primereact/button';

function MyComponent() {
  return (
    <div>
      <Button label="Click me" />
      <Button label="With Icon" icon="pi pi-check" />
      <Button label="Success" severity="success" />
      <Button label="Danger" severity="danger" />
      <Button label="Outlined" outlined />
      <Button label="Text" text />
    </div>
  );
}
```

### Card Component

```typescript
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function MyComponent() {
  const header = <img alt="Card" src="card-image.jpg" />;
  const footer = (
    <div>
      <Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" icon="pi pi-times" severity="secondary" />
    </div>
  );

  return (
    <Card title="Title" subTitle="Subtitle" footer={footer} header={header}>
      <p>Card content goes here.</p>
    </Card>
  );
}
```

### Input Components

```typescript
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

function FormExample() {
  const [value, setValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [date, setDate] = useState(null);

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Tokyo', code: 'TKY' },
  ];

  return (
    <div>
      <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Name" />

      <InputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        cols={30}
      />

      <Dropdown
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
      />

      <Calendar value={date} onChange={(e) => setDate(e.value)} />
    </div>
  );
}
```

### DataTable Component

```typescript
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function TableExample() {
  const [products, setProducts] = useState([
    { id: 1, code: 'P001', name: 'Product 1', price: 100 },
    { id: 2, code: 'P002', name: 'Product 2', price: 200 },
  ]);

  return (
    <DataTable value={products} paginator rows={10}>
      <Column field="code" header="Code" sortable />
      <Column field="name" header="Name" sortable filter />
      <Column field="price" header="Price" sortable />
    </DataTable>
  );
}
```

### Dialog Component

```typescript
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function DialogExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button label="Show Dialog" onClick={() => setVisible(true)} />

      <Dialog
        header="Dialog Title"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <p>Dialog content goes here.</p>
      </Dialog>
    </div>
  );
}
```

### Toast Notifications

```typescript
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef } from 'react';

function ToastExample() {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
      life: 3000,
    });
  };

  const showError = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Message Content',
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <Button label="Success" onClick={showSuccess} />
      <Button label="Error" onClick={showError} severity="danger" />
    </div>
  );
}
```

## Icons

PrimeIcons is included and provides over 250 icons. Use them with the `pi` prefix:

```typescript
import { Button } from 'primereact/button';

function IconExample() {
  return (
    <div>
      <Button icon="pi pi-check" />
      <Button icon="pi pi-times" />
      <Button icon="pi pi-search" />
      <Button icon="pi pi-user" />
      <Button icon="pi pi-cog" />
    </div>
  );
}
```

See all available icons at: https://primereact.org/icons

## Form Validation

PrimeReact works well with form validation libraries. Example with React Hook Form:

```typescript
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

interface FormData {
  name: string;
  email: string;
}

function FormValidationExample() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const getFormErrorMessage = (name: keyof FormData) => {
    return errors[name] ? <small className="p-error">{errors[name]?.message}</small> : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required.' }}
          render={({ field, fieldState }) => (
            <>
              <InputText
                id={field.name}
                {...field}
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              {getFormErrorMessage('name')}
            </>
          )}
        />
      </div>

      <Button type="submit" label="Submit" />
    </form>
  );
}
```

## Best Practices

1. **Import only what you need** - PrimeReact uses tree-shaking, so import components individually
2. **Use TypeScript types** - All components have full TypeScript support
3. **Responsive design** - Use PrimeReact's responsive utilities and breakpoints
4. **Accessibility** - Components are WCAG compliant, but always test with screen readers
5. **Theme customization** - Create custom themes using the Theme Designer: https://designer.primereact.org/

## Documentation

Full documentation available at: https://primereact.org/

- **Components**: https://primereact.org/inputtext/
- **Themes**: https://primereact.org/theming/
- **Icons**: https://primereact.org/icons/
- **Templates**: https://primereact.org/templates/

## Examples in Project

### Dashboard App

See `src/apps/Dashboard/bootstrap.tsx` for an example using Card and Button components in the protected Dashboard area.

### Landing App

See `src/apps/Ladning/bootstrap.tsx` for an example using Card and Button components in the public Landing page.
