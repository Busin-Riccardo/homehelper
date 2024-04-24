import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDebugToast } from '@/lib/debug-helpers/useDebugToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimePickerInput } from '../ui/time-picker-input';

const makeFormSchema = ({ intl }: { intl: IntlShape }) =>
  z.object({
    name: z
      .string()
      .min(1, intl.formatMessage({ id: 'recipes.form.name.err-required' })),
    preparationTimeInSeconds: z
      .number()
      .min(
        0,
        intl.formatMessage({ id: 'recipes.form.preparation-time.err-min' }),
      ),
    cookingTimeInSeconds: z
      .number()
      .min(0, intl.formatMessage({ id: 'recipes.form.cooking-time.err-min' })),
  });

type FormValue = z.infer<ReturnType<typeof makeFormSchema>>;

export function RecipeForm({ initialValues }: { initialValues?: FormValue }) {
  const intl = useIntl();
  const form = useForm<FormValue>({
    defaultValues: initialValues ?? {
      name: '',
      preparationTimeInSeconds: 0,
      cookingTimeInSeconds: 0,
    },
    resolver: zodResolver(makeFormSchema({ intl })),
  });

  const debug = useDebugToast();

  const onSubmit = (value: FormValue) => {
    debug(value);
    console.log(value);
  };

  return (
    <Form {...form}>
      <form
        className="rounded border p-4 flex flex-col gap-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage id="recipes.form.name.label" />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                <FormattedMessage id="recipes.form.name.description" />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2">
          <FormField
            control={form.control}
            name="preparationTimeInSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage id="recipes.form.preparation-time.label" />
                </FormLabel>
                <FormControl>
                  <TimePickerInput
                    value={field.value ? new Date(field.value * 1000) : null}
                    onChange={date => field.onChange(date.getTime() / 1000)}
                    onBlur={field.onBlur}
                    inputs={['hours', 'minutes']}
                  />
                </FormControl>
                <FormDescription>
                  <FormattedMessage id="recipes.form.preparation-time.description" />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cookingTimeInSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage id="recipes.form.cooking-time.label" />
                </FormLabel>
                <FormControl>
                  <TimePickerInput
                    value={field.value ? new Date(field.value * 1000) : null}
                    onChange={date => field.onChange(date.getTime() / 1000)}
                    onBlur={field.onBlur}
                    inputs={['hours', 'minutes']}
                  />
                </FormControl>
                <FormDescription>
                  <FormattedMessage id="recipes.form.cooking-time.description" />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-4 ">
          <Button
            type="reset"
            className="w-full md:w-auto md:min-w-28"
            variant="secondary"
            onClick={() => form.reset()}
          >
            <FormattedMessage id="app.reset" />
          </Button>
          <Button type="submit" className="w-full md:w-auto md:min-w-28">
            <FormattedMessage id="app.save" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
