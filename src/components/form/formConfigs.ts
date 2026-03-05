import { validationRules } from '@/src/helpers/validators';
import { ProductType } from '@/src/types/types';

const formConfigFieldsDict = {
  name: {
    key: 'name',
    label: 'Nombre',
    initialValue: '',
    required: true,
    type: 'text',
    visibility: true,
    rules: [validationRules.required],
  },
  email: {
    key: 'email',
    label: 'Correo electrónico',
    initialValue: '',
    required: true,
    type: 'text',
    visibility: true,
    rules: [validationRules.required, validationRules.email],
  },
  password: {
    key: 'password',
    initialValue: '',
    required: true,
    type: 'password',
    visibility: true,
    rules: [validationRules.required, validationRules.password],
  },
  confirm: {
    key: 'confirm',
    initialValue: '',
    required: true,
    type: 'confirm',
    visibility: true,
    rules: [validationRules.required, validationRules.confirmPassword],
  },
  title: {
    key: 'title',
    label: 'Título',
    initialValue: '',
    required: true,
    type: 'text',
    visibility: true,
    rules: [validationRules.required],
  },
  price: {
    key: 'price',
    label: 'Precio',
    initialValue: '',
    required: true,
    type: 'number',
    visibility: true,
    rules: [validationRules.required],
  },
  pots_count: {
    key: 'pots_count',
    label: 'Uds x caja',
    initialValue: '',
    required: true,
    type: 'number',
    visibility: true,
    rules: [validationRules.required],
  },
  available: {
    key: 'available',
    label: 'En stock',
    initialValue: '',
    required: true,
    type: 'number',
    visibility: true,
    rules: [validationRules.required],
  },
  height: {
    key: 'height',
    label: 'Altura',
    initialValue: '',
    required: false,
    type: 'number',
    visibility: true,
    rules: [],
  },
  width: {
    key: 'width',
    label: 'Diámetro maceta',
    initialValue: '',
    required: false,
    type: 'number',
    visibility: true,
    rules: [],
  },
  comment: {
    key: 'comment',
    label: 'Comentario',
    initialValue: '',
    required: false,
    type: 'textarea',
    visibility: true,
    rules: [],
  },
  images: {
    key: 'images',
    initialValue: '',
    required: false,
    type: 'images',
    visibility: true,
    rules: [],
  },
};

export const AuthFormConfig = [
  formConfigFieldsDict.email,
  formConfigFieldsDict.password,
];

export const SignUpFormConfig = [
  formConfigFieldsDict.name,
  formConfigFieldsDict.email,
  formConfigFieldsDict.password,
  formConfigFieldsDict.confirm,
];

export const RequestResetPasswordFormConfig = [formConfigFieldsDict.email];

export const ResetPasswordFormConfig = [
  formConfigFieldsDict.password,
  formConfigFieldsDict.confirm,
];

export const AdminProductFormConfig = (product?: ProductType) => [
  { ...formConfigFieldsDict.title, initialValue: product?.title || '' },
  { ...formConfigFieldsDict.price, initialValue: product?.price || '' },
  {
    ...formConfigFieldsDict.pots_count,
    initialValue: product?.pots_count || '',
  },
  { ...formConfigFieldsDict.available, initialValue: product?.available || '' },
  { ...formConfigFieldsDict.width, initialValue: product?.width || '' },
  { ...formConfigFieldsDict.height, initialValue: product?.height || '' },
  { ...formConfigFieldsDict.comment, initialValue: product?.comment || '' },
  { ...formConfigFieldsDict.images, initialValue: product?.images || [] },
];
