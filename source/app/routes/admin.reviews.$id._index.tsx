import React, {useCallback, useMemo, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {Single} from '~/admin/components/reviews/Single/Single';
import {DeleteForm} from '~/admin/components/reviews/Single/DeleteForm';
import { TAdminReviewSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';

export {action} from '~/.server/admin/actions/reviews/single/action';

export default function AdminReviewIdIndex() {
  const data = useRouteLoaderData<TAdminReviewSingleLoader>('routes/admin.reviews.$id');
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete review',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return data?.review.deletedAt ? [] : [deleteAction];
  }, [deleteAction, data?.review.deletedAt]);

  if (!data?.review) {
    return null;
  }

  return (
    <Page
      title={`${data?.review.id}`}
      backAction={{
        url: EAdminNavigation.reviews
      }}
      secondaryActions={secondaryActions}
    >
      <Single review={data?.review}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Delete review"
      >
        <DeleteForm toggleActive={toggleActive} review={data?.review}/>
      </Modal>
    </Page>
  );
}
