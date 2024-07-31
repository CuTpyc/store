import {ActionFunctionArgs} from '@remix-run/node';
import {ADMIN_AUTH_STRATEGY, authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {AuthorizationError} from 'remix-auth';
import {validationError} from 'remix-validated-form';
import {ValidatorErrorWrapper} from '~/.server/shared/errors/validator-error-wrapper';

export async function adminAuthLoginAction({request}: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: EAdminNavigation.dashboard,
      //failureRedirect: EAdminNavigation.authLogin,
      throwOnError: true,
    });
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) {
      return error;
    }

    if (error instanceof AuthorizationError) {
      if (error.cause instanceof ValidatorErrorWrapper) {
        return validationError(error.cause.validatorError);
      }

      return validationError({
        fieldErrors: {
          error: error.message
        }
      });
    }

    return validationError({
      fieldErrors: {
        error: 'Unknown Error'
      }
    });
  }
}
