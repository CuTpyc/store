import {Avatar, BlockStack, Card, EmptyState, InlineGrid, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { usePagination } from '~/admin/hooks/usePagination';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { makeTextShorter } from '~/admin/utils/shorted.text.util'

export type PrimaryInfoCardProps = {
  reviews: TReviewDto[];
  pagination: IOffsetPaginationInfoDto;
}

export const CustomerReviewsList: FC<PrimaryInfoCardProps> = ({ reviews, pagination }) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Reviews
          </Text>
        </InlineGrid>
        <BlockStack gap="200">
          <ReviewsList reviews={reviews} pagination={pagination} />
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

function ReviewsList({
  reviews,
  pagination,
}: {
  reviews: TReviewDto[];
  pagination: IOffsetPaginationInfoDto;
}) {
  const paginationProps = usePagination(pagination);


  return (
    <ResourceList
      emptyState={(
        <EmptyState
          heading="Add the reviews firstly"
          image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
        />
      )}
      resourceName={{ singular: "review", plural: "reviews" }}
      items={reviews}
      renderItem={(item) => {
        const { id, review, rate } = item;
        const media = <Avatar customer size="md" name={`Review id: ${id}`} />;

        return (
          <ResourceItem
            id={id}
            url={`${EAdminNavigation.reviews}/${id}`}
            media={media}
            accessibilityLabel={`View details for ${id}`}
          >
            <Text variant="bodyMd" fontWeight="bold" as="h3" >
              Rate: {rate} ★
            </Text>
            <Text variant="bodyMd" as="h4">Review: {makeTextShorter(review)}</Text>
          </ResourceItem>
        );
      }}
      pagination={paginationProps}
    />
  );
}
