/**
 * Lesson access rules.
 *
 * Per TZ section 2/7: the first 3 lessons are a free demo; lessons 4-31
 * require an active subscription. Centralising the rule here keeps the
 * lesson page, /lessons catalog and dashboard in sync.
 */

/** Number of lessons available without a subscription. */
export const FREE_LESSON_COUNT = 3;

/**
 * Returns true if the lesson is unlocked for the current user.
 *
 * @param lessonId       The numeric lesson id (1-based).
 * @param hasSubscription Whether the user currently has an active subscription.
 */
export function isLessonUnlocked(lessonId: number, hasSubscription: boolean): boolean {
  if (lessonId <= FREE_LESSON_COUNT) return true;
  return hasSubscription;
}
