'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const shimmer = {
  initial: { backgroundPosition: '-200%' },
  animate: {
    backgroundPosition: '200%',
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'linear',
    },
  },
};

export function LoanCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className='gap-2'>
          <motion.div variants={shimmer} initial='initial' animate='animate'>
            <Skeleton className='h-5 w-1/4' />
          </motion.div>
          <motion.div variants={shimmer} initial='initial' animate='animate'>
            <Skeleton className='h-4 w-1/3' />
          </motion.div>
        </CardHeader>
        <CardContent className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <motion.div variants={shimmer} initial='initial' animate='animate'>
              <Skeleton className='h-4 w-[120px]' />
            </motion.div>
            <motion.div variants={shimmer} initial='initial' animate='animate'>
              <Skeleton className='h-6 w-[180px]' />
            </motion.div>
          </div>
          <div className='space-y-2'>
            <motion.div variants={shimmer} initial='initial' animate='animate'>
              <Skeleton className='h-4 w-[100px]' />
            </motion.div>
            <motion.div variants={shimmer} initial='initial' animate='animate'>
              <Skeleton className='h-6 w-[140px]' />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function LoanDetailSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <motion.div
                variants={shimmer}
                initial='initial'
                animate='animate'
              >
                <Skeleton className='h-6 w-[200px]' />
              </motion.div>
              <motion.div
                variants={shimmer}
                initial='initial'
                animate='animate'
              >
                <Skeleton className='h-4 w-[300px]' />
              </motion.div>
            </div>
            <div className='flex gap-4'>
              <motion.div
                variants={shimmer}
                initial='initial'
                animate='animate'
              >
                <Skeleton className='h-10 w-[100px]' />
              </motion.div>
              <motion.div
                variants={shimmer}
                initial='initial'
                animate='animate'
              >
                <Skeleton className='h-10 w-[120px]' />
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <motion.div
                  variants={shimmer}
                  initial='initial'
                  animate='animate'
                >
                  <Skeleton className='mb-4 h-4 w-[150px]' />
                </motion.div>
                <div className='space-y-2'>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-6 w-[200px]' />
                  </motion.div>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-4 w-[180px]' />
                  </motion.div>
                </div>
              </div>
              <div>
                <motion.div
                  variants={shimmer}
                  initial='initial'
                  animate='animate'
                >
                  <Skeleton className='mb-4 h-4 w-[120px]' />
                </motion.div>
                <div className='space-y-2'>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-6 w-[150px]' />
                  </motion.div>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-4 w-[100px]' />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <motion.div
                  variants={shimmer}
                  initial='initial'
                  animate='animate'
                >
                  <Skeleton className='mb-4 h-4 w-[130px]' />
                </motion.div>
                <div className='space-y-2'>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-6 w-[160px]' />
                  </motion.div>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-4 w-[140px]' />
                  </motion.div>
                </div>
              </div>
              <div>
                <motion.div
                  variants={shimmer}
                  initial='initial'
                  animate='animate'
                >
                  <Skeleton className='mb-4 h-4 w-[110px]' />
                </motion.div>
                <div className='space-y-2'>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-6 w-[170px]' />
                  </motion.div>
                  <motion.div
                    variants={shimmer}
                    initial='initial'
                    animate='animate'
                  >
                    <Skeleton className='h-4 w-[130px]' />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
